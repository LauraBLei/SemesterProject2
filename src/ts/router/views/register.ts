import { onRegister } from '../../ui/auth/register';

const runPage = () => {
  const form = document.getElementById('register');
  form?.addEventListener('submit', onRegister);
};
runPage();
