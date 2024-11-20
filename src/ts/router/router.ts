export default async function router(pathname = window.location.pathname) {
  console.log(pathname);
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
    case '/post/':
      await import('./views/listing.ts');
      break;
    case '/post/edit/':
      await import('./views/listingEdit.ts');
      break;
    case '/post/create/':
      await import('./views/listingCreate.ts');
      break;
    case '/profile/':
      await import('./views/profile.ts');
      break;
    case '/myBids/':
      await import('./views/myBids.ts');
      break;
    default:
      await import('./views/notFound.ts');
  }
}
