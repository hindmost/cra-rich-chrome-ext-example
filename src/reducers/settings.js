import {
  SET_MATCH_WHOLE, SET_MATCH_CASE,
  SET_COLOR, SET_COLOR_BG,
  SET_BOLD, SET_UNDERLINE
} from '../actions/settings';

const initialState = {
  matchWhole: false,
  matchCase: false,
  color: '#ffffff',
  colorBg: '#ff9632',
  bold: false,
  underline: false
};

export default function settings(state = initialState, action) {
  const {type, data} = action;
  switch (type) {
    case SET_MATCH_WHOLE:
      return {
        ...state,
        matchWhole: Boolean(data)
      };
    case SET_MATCH_CASE:
      return {
        ...state,
        matchCase: Boolean(data)
      };
    case SET_COLOR:
      return {
        ...state,
        color: data
      };
    case SET_COLOR_BG:
      return {
        ...state,
        colorBg: data
      };
    case SET_BOLD:
      return {
        ...state,
        bold: Boolean(data)
      };
    case SET_UNDERLINE:
      return {
        ...state,
        underline: Boolean(data)
      };
    default:
      return state;
  }
}
