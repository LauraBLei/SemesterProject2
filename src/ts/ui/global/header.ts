import { iconPaths } from '../../utilities/enums';
import { CreateElement } from './components/createElement';
import { Icon } from './components/makeIcon';
import { onLogout } from '../auth/logout';
import { MakeCreateOrEditForm } from '../../router/views/listingCreateEdit';

export const MakeHeader = () => {
  Header();
};

const toggleSideBar = (sidebarID: string, btn: string) => {
  const toggleButton = document.getElementById(btn);
  const sidebar = document.getElementById(sidebarID);

  sidebar?.classList.toggle('closed');
  toggleButton?.classList.toggle('rotate');
};

const toggleActive = () => {
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.navAnchor'); // Select all navigation links with the class 'nav-link'

  navLinks.forEach((link) => {
    // Check if the link's href matches the current pathname
    if (link.href === window.location.href) {
      link.classList.toggle('active'); // Add 'active' class if it matches
    } else {
      return;
    }
  });
};

const Header = () => {
  const loggedIn = localStorage.getItem('token');
  const isHomePage = window.location.pathname === '/';
  const homeIconColor = isHomePage ? '#DAA520' : '#FFFFFF';
  const isSearchPage = window.location.pathname === '/listing/search/';
  const isAuthPage = ['/auth/', '/auth/login/', '/auth/register/'].includes(
    window.location.pathname
  );
  const authIconColor = isAuthPage ? '#DAA520' : '#FFFFFF';
  const searchIconColor = isSearchPage ? '#DAA520' : '#FFFFFF';
  const header = document.querySelector('header');
  const sidebar = CreateElement({
    element: 'nav',
    id: 'sidebar',
    styling: 'sidebar closed',
  });
  header?.appendChild(sidebar);

  const button = CreateElement({
    element: 'button',
    id: 'toggle-btn',
    styling: 'toggle-btn flex items-center',
  });
  button.innerHTML = `${Icon(iconPaths.doubleArrows)}
  `;
  button.addEventListener('click', () =>
    toggleSideBar('sidebar', 'toggle-btn')
  );
  sidebar.append(button);

  if (loggedIn) {
    const user = JSON.parse(localStorage.getItem('userInfo') ?? '');
    const profile = CreateElement({
      element: 'a',
      styling: 'flex gap-2 items-center navAnchor',
      href: '/profile/',
    });
    profile.innerHTML = `
  <div id='profileNav' class="profileNav min-w-[30px] min-h-[30px] max-h-[30px] max-w-[30px] flex items-center bg-brandBlack rounded-full overflow-hidden">
      <img class="object-cover w-full h-full" src="${user.avatar.url}" alt="User profile image">
  </div>
  <span id="navSpan">${user.name}</span>
`;
    sidebar.append(profile);
  } else {
    const auth = CreateElement({
      element: 'a',
      href: '/auth/',
      styling: 'flex gap-4 items-center navAnchor',
    });
    auth.innerHTML = `
      <div>${Icon(iconPaths.profile, authIconColor)}</div>
      <span id="navSpan" class='navSpan'>Login</span> `;
    sidebar.append(auth);
  }

  const home = CreateElement({
    element: 'a',
    href: '/',
    styling: 'flex gap-4 px-4 py-2 navAnchor items-center ',
  });
  home.innerHTML = `
    <div>${Icon(iconPaths.home, homeIconColor)}</div>
    <span id="navSpan" class='navSpan'>Home</span> `;

  const search = CreateElement({
    element: 'a',
    styling: 'flex gap-4 px-4 py-2 items-center navAnchor',
    href: '/listing/search/',
  });
  search.innerHTML = `<div>${Icon(iconPaths.search, searchIconColor)}</div>
  <span id="navSpan" class='navSpan'>Search...</span>
  `;
  sidebar.append(home, search);
  if (loggedIn) {
    const createListing = CreateElement({
      element: 'a',
      styling: 'flex gap-4 navAnchor items-center',
      id: 'createListingButton',
    });
    createListing.innerHTML = `<div>${Icon(iconPaths.plus)}</div>
    <span id="navSpan">Create Listing</span>`;
    createListing.addEventListener('click', () => {
      const div = document.getElementById('createEditContainer');
      div?.classList.remove('hidden');
      MakeCreateOrEditForm({ create: true });
    });
    const logOut = CreateElement({
      element: 'a',
      styling: 'flex gap-4 navAnchor items-center',
    });
    logOut.innerHTML = `<div>${Icon(iconPaths.logOut)}</div>
    <span id="navSpan" class='navSpan'>Log Out</span>`;
    logOut.addEventListener('click', onLogout);

    sidebar.append(createListing, logOut);
  }
  toggleActive();
};
