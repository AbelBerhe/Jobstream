export default {
  oidc: {
    issuer: 'https://integrator-7844210.okta.com/oauth2/default',
    clientId: '0oauo30rwcBkzuqmS697',
    scopes: ['openid', 'profile', 'email'],
    redirectUri: `http://localhost:3000/login/callback`
  },
  widget: {
    issuer: 'https://integrator-7844210.okta.com/oauth2/default',
    clientId: '0oauo30rwcBkzuqmS697',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    responseType: ['id_token', 'token'],
  }
  ,
  features: {
      registration: true,
  }
};
