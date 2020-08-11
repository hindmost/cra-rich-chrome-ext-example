import {
  SET_ENABLED, SET_STATS, SET_ICONHASH
} from '../actions/marker';

const initialState = {
  enabled: false,
  stats: false,
  iconHash: ''
};

export default function marker(state = initialState, action) {
  const {type, data} = action;
  switch (type) {
    case SET_ENABLED:
      return {
        ...state,
        enabled: Boolean(data)
      };
    case SET_STATS:
      return {
        ...state,
        stats: Array.isArray(data)? data.slice() : false
      };
    case SET_ICONHASH:
      return {
        ...state,
        iconHash: data
      };
    default:
      return state;
  }
}
