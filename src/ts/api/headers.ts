import { API } from './APIEndPoints';

export function headers() {
  const headers = new Headers();

  if (API.KEY) {
    headers.append('X-Noroff-API-Key', API.KEY);
  }

  if (localStorage.token) {
    const token = 'Bearer ' + JSON.parse(localStorage.getItem('token') ?? '');
    headers.append('Authorization', token);
  }
  headers.append('content-Type', 'application/json');

  return headers;
}
