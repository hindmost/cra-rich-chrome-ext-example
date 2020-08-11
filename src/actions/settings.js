export const SET_MATCH_WHOLE = 'SET_MATCH_WHOLE';
export const SET_MATCH_CASE = 'SET_MATCH_CASE';
export const SET_COLOR = 'SET_COLOR';
export const SET_COLOR_BG = 'SET_COLOR_BG';
export const SET_BOLD = 'SET_BOLD';
export const SET_UNDERLINE = 'SET_UNDERLINE';

export const setMatchWhole = data => ({
  type: SET_MATCH_WHOLE, data
});

export const setMatchCase = data => ({
  type: SET_MATCH_CASE, data
});

export const setColor = data => ({
  type: SET_COLOR, data
});

export const setColorBg = data => ({
  type: SET_COLOR_BG, data
});

export const setBold = data => ({
  type: SET_BOLD, data
});

export const setUnderline = data => ({
  type: SET_UNDERLINE, data
});
