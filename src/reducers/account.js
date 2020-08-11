import {
  ACCOUNT_AUTH, ACCOUNT_PROFILE, ACCOUNT_LOGOUT
} from '../actions/account';

const initialState = {
  token: false,
  name: '',
  keywords: false
};

export default function account(state = initialState, action) {
  const {type, data} = action;
  switch (type) {
    case ACCOUNT_AUTH:
      return {
        ...state,
        token: data
      };
    case ACCOUNT_PROFILE:
      const {name, keywords} = data;
      return {
        ...state,
        name,
        keywords: Array.isArray(keywords)? keywords.slice() : false
      };
    case ACCOUNT_LOGOUT:
      return {
        ...state,
        token: false,
        name: '',
        keywords: false
      };
    default:
      return state;
  }
}
