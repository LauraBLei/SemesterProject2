import { confirmText } from '../../ui/global/components/confirm';
import { RegisterForm } from '../../utilities/types';
import { API } from '../APIEndPoints';
import { headers } from '../headers';
import { login } from './login';

/**
 * Function that will register a user
 * @param {object} userInfo - userinfo object, that container name, email and password.
 * @param {string} userInfo.name - user name
 * @param {string} userInfo.email - user email
 * @param {string} userInfo.password - user password
 * @example
 * ```js
 * register({name: "Thor", email: "email@stud.noroff.no", password: "password123"})
 * ```
 */

export async function register({ name, email, password }: RegisterForm) {
  const body = {
    name: name,
    email: email,
    password: password,
  };

  try {
    const response = await fetch(API.AUTH_REGISTER, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(body),
    });
    if (response.ok) {
      document.getElementById('registeredAccount')?.classList.remove('hidden');

      login({ email, password });
    } else {
      document
        .getElementById('error-account-already-exists')
        ?.classList.remove('hidden');
    }
  } catch (error) {}
}
