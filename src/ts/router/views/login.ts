import { onLogin } from '../../ui/auth/login';
import { MakeHeader } from '../../ui/global/header';

const runPage = () => {
  MakeHeader();
  const form = document.getElementById('login');
  console.log(form);

  form?.addEventListener('submit', onLogin);
};
runPage();
