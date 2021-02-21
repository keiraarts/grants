let environment = 'prod';

if (process && process.env && process.env.NODE_ENV === 'development') environment = 'dev';
export function apiUrl() {
  console.log(environment);
  if (environment === 'dev') return 'http://localhost:7777';
  else if (environment === 'prod') return 'https://grants.art';
}
