export default {
  oidc: {
    issuer: 'https://trial-1922108.okta.com/oauth2/default',
    clientId: '0oau252re6WOD4M4F697',
    scopes: ['openid', 'profile', 'email'],
    redirectUri: `http://localhost:3000/login/callback`
  },
  widget: {
    issuer: 'https://trial-1922108.okta.com/oauth2/default',
    clientId: '0oau252re6WOD4M4F697',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
  }
  ,
  features: {
      registration: true,
  }
};
