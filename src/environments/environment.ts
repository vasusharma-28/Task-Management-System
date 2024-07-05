export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: '672665a8-998c-4f2e-958d-71047cbd97b4',
      authority:
        'https://login.microsoftonline.com/23a5dd4c-7ada-4643-b842-4013baba973a',
    },
  },
  apiConfig: {
    scopes: ['user.read'],
    uri: 'https://graph.microsoft.com/v1.0/me',
  },
};
