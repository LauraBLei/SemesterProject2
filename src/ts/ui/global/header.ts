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

  sidebar?.classList.toggle('close');
  toggleButton?.classList.toggle('rotate');
};

const Header = () => {
  const loggedIn = localStorage.getItem('token');
  const header = document.querySelector('header');
  const sidebar = CreateElement({ element: 'nav', id: 'sidebar' });
  header?.appendChild(sidebar);

  const button = CreateElement({
    element: 'button',
    id: 'toggle-btn',
    styling: 'flex items-center',
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
      styling: 'flex gap-2 items-center buttonEffect',
      href: '/profile/',
    });
    profile.innerHTML = `
  <div class="w-[40px] h-[40px] bg-gray-500 rounded-full overflow-hidden">
      <img class="object-cover" src="${user.avatar.url}" alt="User profile image">
  </div>
  <span id="navSpan">${user.name}</span>
`;
    sidebar.append(profile);
  } else {
    const auth = CreateElement({
      element: 'a',
      href: '/auth/',
      styling: 'flex gap-4',
    });
    auth.innerHTML = `${Icon(iconPaths.profile)}
  <span id="navSpan">Login</span> `;
    sidebar.append(auth);
  }

  const home = CreateElement({
    element: 'a',
    href: '/',
    styling: 'flex gap-4 buttonEffect',
  });
  home.innerHTML = `${Icon(iconPaths.home)}
  <span id="navSpan">Home</span> `;

  const search = CreateElement({
    element: 'a',
    styling: 'flex gap-4 hover:bg-white/50 px-4 py-2 buttonEffect',
    href: '/listing/search/',
  });
  search.innerHTML = `${Icon(iconPaths.search)}
  <span id="navSpan">Search...</span>
  `;
  sidebar.append(home, search);
  if (loggedIn) {
    const createListing = CreateElement({
      element: 'a',
      styling: 'flex gap-4 buttonEffect',
      id: 'createListingButton',
    });
    createListing.innerHTML = `${Icon(iconPaths.plus)}
<span id="navSpan">Create Listing</span>`;
    createListing.addEventListener('click', () => {
      const div = document.getElementById('createEditContainer');
      div?.classList.remove('hidden');
      MakeCreateOrEditForm({ create: true });
    });
    const logOut = CreateElement({
      element: 'a',
      styling: 'flex gap-4 buttonEffect',
    });
    logOut.innerHTML = `${Icon(iconPaths.logOut)}
<span id="navSpan">Log Out</span>
`;
    logOut.addEventListener('click', onLogout);

    sidebar.append(createListing, logOut);
  }
};
