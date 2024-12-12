import { iconPaths } from '../../../utilities/enums';
import { CreateElement } from './createElement';
import { Icon } from './makeIcon';
import { onLogout } from '../../auth/logout';
import { MakeCreateOrEditForm } from '../../../router/views/listingCreateEdit';
import { initializeDarkMode, toggleDarkMode } from './darkmode';

export const MakeHeader = () => {
  Header();
  initializeDarkMode();
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
  const sidebar = CreateElement<HTMLElement>({
    element: 'nav',
    id: 'sidebar',
    styling: 'sidebar closed',
  });
  header?.appendChild(sidebar);

  const darkMode = CreateElement<HTMLButtonElement>({
    element: 'button',
    text: 'Dark',
    id: 'darkMode',
  });
  darkMode.addEventListener('click', () => toggleDarkMode());

  const button = CreateElement<HTMLButtonElement>({
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
    const profile = makeNavProfile();
    sidebar.append(profile);
  } else {
    const auth = makeNavElement({
      icon: iconPaths.profile,
      color: authIconColor,
      text: 'Login',
      href: '/auth/',
    });
    sidebar.append(auth);
  }

  const home = makeNavElement({
    icon: iconPaths.home,
    color: homeIconColor,
    text: 'Home',
    href: '/',
  });
  const search = makeNavElement({
    icon: iconPaths.search,
    color: searchIconColor,
    text: 'Search',
    href: '/listing/search/',
  });

  sidebar.append(home, search, darkMode);
  if (loggedIn) {
    const create = makeNavElement({
      icon: iconPaths.plus,
      text: 'Create Listing',
    });
    create.addEventListener('click', () => {
      const div = document.getElementById(
        'createEditContainer'
      ) as HTMLDivElement;
      if (div?.classList.contains('hidden')) {
        div?.classList.remove('hidden');
        MakeCreateOrEditForm({ create: true });
      } else {
        div.classList.add('hidden');
        div.innerHTML = '';
      }
    });
    const logOut = makeNavElement({ icon: iconPaths.logOut, text: 'Log Out' });
    logOut.addEventListener('click', onLogout);

    sidebar.append(create, logOut);
  }
  toggleActive();
};

const makeNavElement = ({
  icon,
  text,
  color,
  href,
}: {
  icon?: iconPaths;
  text: string;
  color?: string;
  href?: string;
}) => {
  const link = CreateElement<HTMLAnchorElement>({
    element: 'a',
    styling: 'flex gap-4 items-center navAnchor',
    href: href,
  });
  const span = CreateElement<HTMLDivElement>({
    element: 'span',
    text: text,
    styling: 'navSpan',
    id: 'navSpan',
  });

  const navIcon = CreateElement<HTMLDivElement>({ element: 'div' });
  if (icon) navIcon.innerHTML = `${Icon(icon, color)}`;

  link.append(navIcon, span);
  return link;
};

const makeNavProfile = () => {
  const user = JSON.parse(localStorage.getItem('userInfo') ?? '');
  const profile = CreateElement<HTMLAnchorElement>({
    element: 'a',
    styling: 'flex gap-2 items-center navAnchor',
    href: '/profile/',
  });
  const imageContainer = CreateElement<HTMLDivElement>({
    element: 'div',
    id: 'profileNav',
    styling:
      'profileNav min-w-[30px] min-h-[30px] max-h-[30px] max-w-[30px] flex items-center bg-brandBlack rounded-full overflow-hidden',
  });
  const profileImage = CreateElement<HTMLImageElement>({
    element: 'img',
    src: user.avatar.url,
    styling: 'object-cover w-full h-full',
  });
  const userName = CreateElement<HTMLSpanElement>({
    element: 'span',
    text: user.name,
    styling: 'navSpan',
    id: 'navSpan',
  });

  profile.append(imageContainer, userName);
  imageContainer.append(profileImage);

  return profile;
};
