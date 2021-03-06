let environment = 'prod';

if (process && process.env && process.env.NODE_ENV === 'development') environment = 'dev';
export function apiUrl() {
  if (environment === 'dev') return 'http://localhost:7777/api';
  else if (environment === 'prod') return 'https://grants.art/api';
}
