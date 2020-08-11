import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import storeCreatorFactory from 'reduxed-chrome-storage';
import reducers from './reducers';
import 'semantic-ui-css/semantic.min.css';
import App from './views/Options/App';

(async () => {
  const store = await storeCreatorFactory({createStore})(reducers);
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
})();
