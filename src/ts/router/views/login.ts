import { onLogin } from '../../ui/auth/login';

export const runLogin = () => {
  const form = document.getElementById('login');
  form?.addEventListener('submit', onLogin);
};
