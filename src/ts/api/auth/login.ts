import { API } from '../APIEndPoints';
import { headers } from '../headers';
import { loginForm } from '../../utilities/types';
/**
 * Will login user - and store information in local storage - if email and password are correct.
 * @param {object} userinfo = object that contains email and password.
 * @param {string} email - user email for login.
 * @param {string} password - user password for login.
 * @example
 * ```js
 * login({email:"email@gmail.com", password:"password123"})
 * ```
 */

export async function login({ email, password }: loginForm) {
  const body = {
    email: email,
    password: password,
  };
  const errorMessage = document.getElementById(
    'error-message'
  ) as HTMLDivElement;
  try {
    const response = await fetch(API.AUTH_LOGIN, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(body),
    });
    if (response.ok) {
      alert(`Successfully logged in"`);
      const data = await response.json();
      localStorage.setItem('userInfo', JSON.stringify(data.data));
      localStorage.setItem('token', JSON.stringify(data.data.accessToken));
      window.location.href = '/';
    } else {
      if (errorMessage) errorMessage.classList.remove('hidden');
    }
  } catch (error) {
    window.location.href = '/error/';
  }
}
