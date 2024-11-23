import { iconPaths } from '../../utilities/enums';
import { CreateElement, Icon } from '../../utilities/components';
import { onLogout } from '../auth/logout';
import { createListing } from '../../router/views/listingCreate';

export const MakeHeader = () => {
  const loggedIn = localStorage.getItem('token');

  if (loggedIn) {
    LoggedIn();
  } else {
    LoggedOut();
  }
  createListing();
};

const toggleSideBar = (sidebarID: string, btn: string) => {
  const toggleButton = document.getElementById(btn);
  const sidebar = document.getElementById(sidebarID);

  sidebar?.classList.toggle('close');
  toggleButton?.classList.toggle('rotate');
};

const LoggedIn = () => {
  const user = JSON.parse(localStorage.getItem('userInfo') ?? '');

  const header = document.querySelector('header');
  const sidebar = CreateElement({ element: 'nav', id: 'sidebar' });
  const button = CreateElement({
    element: 'button',
    id: 'toggle-btn',
    styling: 'flex items-center',
  });
  button.innerHTML = `
                ${Icon(iconPaths.doubleArrows)}

  `;
  button.addEventListener('click', () =>
    toggleSideBar('sidebar', 'toggle-btn')
  );

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

  const home = CreateElement({
    element: 'a',
    href: '/',
    styling: 'flex gap-4 buttonEffect',
  });

  home.innerHTML = `${Icon(iconPaths.home)}
  <span id="navSpan">Home</span> `;

  const myBids = CreateElement({
    element: 'a',
    href: '/myBids/',
    styling: 'flex gap-4 buttonEffect',
  });
  myBids.innerHTML = `${Icon(iconPaths.hammer)}
  <span id="navSpan">My Bids</span> `;

  const createListing = CreateElement({
    element: 'a',
    styling: 'flex gap-4 buttonEffect',
    id: 'createListingButton',
  });
  createListing.innerHTML = `${Icon(iconPaths.plus)}
  <span id="navSpan">Create Listing</span>`;

  const logOut = CreateElement({
    element: 'a',
    styling: 'flex gap-4 buttonEffect',
  });
  logOut.innerHTML = `${Icon(iconPaths.logOut)}
  <span id="navSpan">Log Out</span>
  `;
  logOut.addEventListener('click', onLogout);

  const search = CreateElement({
    element: 'a',
    styling: 'flex gap-4 hover:bg-white/50 px-4 py-2 buttonEffect',
    href: '/listing/search/',
  });
  search.innerHTML = `${Icon(iconPaths.search)}
  <span id="navSpan">Search...</span>
  `;

  header?.appendChild(sidebar);
  sidebar.append(button, profile, home, myBids, createListing, logOut, search);
};

const LoggedOut = () => {
  const header = document.querySelector('header');
  const sidebar = CreateElement({
    element: 'nav',
    id: 'sidebar',
    styling: 'pt-5',
  });

  const button = CreateElement({
    element: 'button',
    id: 'toggle-btn',
    styling: 'place-self-center',
  });

  button.innerHTML = `
                ${Icon(iconPaths.doubleArrows)}

  `;
  button.addEventListener('click', () =>
    toggleSideBar('sidebar', 'toggle-btn')
  );

  const auth = CreateElement({
    element: 'a',
    href: '/auth/',
    styling: 'flex gap-4',
  });
  auth.innerHTML = `${Icon(iconPaths.profile)}
  <span id="navSpan">Login</span> `;

  const home = CreateElement({
    element: 'a',
    href: '/',
    styling: 'flex gap-4',
  });

  home.innerHTML = `${Icon(iconPaths.home)}
  <span id="navSpan">Home</span> `;

  header?.appendChild(sidebar);
  sidebar.append(button, auth, home);
};
