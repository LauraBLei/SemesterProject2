import { MakeHeader } from '../../ui/global/header';
import { authGuard } from '../../utilities/authGuard';

const runPage = () => {
  MakeHeader();
  authGuard();
};

runPage();
