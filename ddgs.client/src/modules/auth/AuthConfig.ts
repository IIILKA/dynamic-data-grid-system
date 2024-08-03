const ddgsSettings = {
  authority: import.meta.env.VITE_AUTH_AUTHORITY,
  client_id: import.meta.env.VITE_AUTH_CLIENT_ID,
  client_secret: import.meta.env.VITE_AUTH_CLIENT_SECRET,
  redirect_uri: `${import.meta.env.VITE_SELF_URL}/oauth/callback`,
  silent_redirect_uri: `${import.meta.env.VITE_SELF_URL}/oauth/callback`,
  post_logout_redirect_uri: `${import.meta.env.VITE_SELF_URL}/login`,
  response_type: 'code',
  scope: 'ddgs.api openid profile'
};

export const ddgsConfig = {
  settings: ddgsSettings,
  flow: 'ddgs'
};
