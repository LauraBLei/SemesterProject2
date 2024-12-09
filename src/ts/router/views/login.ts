import { onLogin } from '../../ui/auth/login';

const runPage = () => {
  const form = document.getElementById('login');
  form?.addEventListener('submit', onLogin);
};
runPage();
