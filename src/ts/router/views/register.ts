import { onRegister } from '../../ui/auth/register';
import { MakeHeader } from '../../ui/global/header';

const runPage = () => {
  MakeHeader();
  const form = document.getElementById('register');
  form?.addEventListener('submit', onRegister);
};
runPage();
