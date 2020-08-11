export const SET_ENABLED = 'SET_ENABLED';
export const SET_STATS = 'SET_STATS';
export const SET_ICONHASH = 'SET_ICONHASH';

export const setEnabled = data => ({
  type: SET_ENABLED, data
});

export const setStats = data => ({
  type: SET_STATS, data
});

export const setIconHash = data => ({
  type: SET_ICONHASH, data
});
