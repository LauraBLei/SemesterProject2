import { register } from '../../api/auth/register';
import { RegisterForm } from '../../utilities/types';
/**
 * Fetch Register form data and run the fetch call aka. Register a user
 * @param {object} event
 * @example
 * ```js
 * form.addEventListener("submit", onRegister)
 * ```
 */
export async function onRegister(event: SubmitEvent) {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);

  const registerData: RegisterForm = {
    name: formData.get('name') ?? '',
    email: formData.get('email') ?? '',
    password: formData.get('password') ?? '',
  };
  const email = (formData.get('email') ?? '').toString();

  if (!email.endsWith('@stud.noroff.no')) {
    const errorMessage = document.getElementById(
      'error-message-register'
    ) as HTMLDivElement;
    if (errorMessage) {
      errorMessage.classList.remove('hidden');
    }
    return;
  }

  register(registerData);
}
