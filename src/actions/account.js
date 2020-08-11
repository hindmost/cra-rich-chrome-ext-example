export const ACCOUNT_AUTH = 'ACCOUNT_AUTH';
export const ACCOUNT_PROFILE = 'ACCOUNT_PROFILE';
export const ACCOUNT_LOGOUT = 'ACCOUNT_LOGOUT';

export const accountAuth = data => ({
  type: ACCOUNT_AUTH, data
});

export const accountProfile = data => ({
  type: ACCOUNT_PROFILE, data
});

export const accountLogout = () => ({
  type: ACCOUNT_LOGOUT
});
