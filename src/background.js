import { createStore } from 'redux';
import storeCreatorFactory from 'reduxed-chrome-storage';
import reducers from './reducers';
import { accountLogout, setStats, setIconHash } from './actions';

const storeCreator = storeCreatorFactory({createStore});
let store;
const getStore = async () => {
  if (store)
    return store;
  store = await storeCreator(reducers);
  return store;
};

const iconVariants = [
  {
    '16' : 'icon-outlined-16.png',
    '32' : 'icon-outlined-32.png'
  },
  {
    '16' : 'icon-filled-16.png',
    '32' : 'icon-filled-32.png'
  }
];
const displayIcon = (store) => {
  const state = store.getState();
  const {account, marker} = state;
  const {token} = account;
  const {iconHash, stats} = marker;
  const text = stats? String(stats.reduce((s, v) => s + v)) : '';
  const newIconHash = (token? 1: 0) + ':' + text;
  if (newIconHash === iconHash)
    return;
  store.dispatch(setIconHash(newIconHash));
  chrome.browserAction.setIcon({path: iconVariants[token? 1: 0]});
  chrome.browserAction.setBadgeText({text});
};

chrome.runtime.onStartup.addListener(async () => {
  const store = await getStore();
  // reset user session:
  store.dispatch(accountLogout());
  // reset icon:
  store.dispatch(setIconHash(''));
  displayIcon(store);
});

chrome.tabs.onActivated.addListener(async data => {
  const {tabId} = data;
  if (!tabId)
    return;
  const store = await getStore();
  const state = store.getState();
  const {account, marker} = state;
  const toMark = account.keywords && marker.enabled;
  if (!toMark)
    return;
  // reset marker stats:
  store.dispatch(setStats(false));
  // pass focus to active tab:
  chrome.tabs.sendMessage(tabId, {id: 'tabFocusPass'});
});

(async () => {
  const store = await getStore();
  store.subscribe(() => {
    displayIcon(store);
  });
})();
