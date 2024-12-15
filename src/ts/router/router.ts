import { hideLoader, showLoader } from '../ui/global/components/loader.ts';
import { runPage } from './views/home.ts';
import { runListingPage } from './views/listing.ts';
import { runLogin } from './views/login.ts';
import { runProfile } from './views/profile.ts';
import { runRegister } from './views/register.ts';
import { runSearchPage } from './views/search.ts';

export default async function router(pathname = window.location.pathname) {
  showLoader();
  try {
    switch (pathname) {
      case '/':
        await import('./views/home.ts');
        await runPage();
        break;
      case '/auth/':
        await import('./views/auth.ts');
        break;
      case '/auth/login/':
        await import('./views/login.ts');
        runLogin();
        break;
      case '/auth/register/':
        await import('./views/register.ts');
        runRegister();
        break;
      case '/listing/':
        await import('./views/listing.ts');
        await runListingPage();
        break;
      case '/profile/':
        await import('./views/profile.ts');
        await runProfile();
        break;
      default:
        await import('./views/notFound.ts');
    }
  } catch (error) {
    console.error(error);
  } finally {
    hideLoader();
  }
}
