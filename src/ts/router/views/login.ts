import { onLogin } from '../../ui/auth/login';
import { MakeHeader } from '../../ui/global/header';

const runPage = () => {
  MakeHeader();
  const form = document.getElementById('login');
  form?.addEventListener('submit', () => onLogin);
};
runPage();
