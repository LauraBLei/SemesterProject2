import { login } from '../../api/auth/login';
import { loginForm } from '../../utilities/types';
/**
 * Fetch login form data and run the fetch call aka. login
 * @param {object} event
 * @example
 * ```js
 * form.addEventListener("submit", onLogin)
 * ```
 */

export async function onLogin(event: SubmitEvent) {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  const loginData: loginForm = {
    email: formData.get('email') ?? '',
    password: formData.get('password') ?? '',
  };

  await login(loginData);
}
