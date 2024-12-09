import { onRegister } from '../../ui/auth/register';

export const runRegister = () => {
  const form = document.getElementById('register');
  form?.addEventListener('submit', onRegister);
};
