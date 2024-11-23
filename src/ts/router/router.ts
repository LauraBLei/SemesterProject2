export default async function router(pathname = window.location.pathname) {
  console.log('pathname before router:', pathname);
  switch (pathname) {
    case '/':
      await import('./views/home.ts');
      break;
    case '/auth/':
      await import('./views/auth.ts');
      break;
    case '/auth/login/':
      await import('./views/login.ts');
      break;
    case '/auth/register/':
      await import('./views/register.ts');
      break;
    case '/listing/':
      await import('./views/listing.ts');
      break;
    case '/search/':
      console.log('hei');
      await import('./views/search.ts');
      break;
    case '/profile/':
      await import('./views/profile.ts');
      break;
    case '/myBids/':
      await import('./views/myBids.ts');
      break;
    default:
      console.log('Route not found for:', pathname);

      await import('./views/notFound.ts');
  }
}
