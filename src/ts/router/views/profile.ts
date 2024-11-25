import { readProfile } from '../../api/profile/read';
import { createCountdownHTML } from '../../ui/global/countdown';
import { MakeHeader } from '../../ui/global/header';
import { CreateElement, Icon } from '../../utilities/components';
import { iconPaths } from '../../utilities/enums';
import { UserProfileAPI } from '../../utilities/types';

const runPage = async () => {
  const user = JSON.parse(localStorage.getItem('userInfo') ?? '');
  const userInfo: UserProfileAPI = await readProfile(user.name);
  console.log(userInfo);

  MakeProfile(userInfo);
};

const MakeProfile = (userInfo: UserProfileAPI) => {
  const userListings = userInfo.listings;

  const bannerDiv = document.getElementById('banner');
  const banner = CreateElement({
    element: 'img',
    src: userInfo.banner.url,
    alt: userInfo.banner.alt,
    styling: 'w-full h-full object-cover',
  });
  bannerDiv?.appendChild(banner);

  const updateProfileDiv = document.getElementById(
    'updateProfile'
  ) as HTMLDivElement;
  updateProfileDiv.innerHTML = `
        <details>
            <summary class='list-none' >${Icon(iconPaths.setting, '#00000', '40px')}</summary>
            <div></div>
        </details>
    `;

  const avatarDiv = document.getElementById('avatar') as HTMLDivElement;
  const avatar = CreateElement({
    element: 'img',
    src: userInfo.avatar.url,
    alt: userInfo.avatar.alt,
    styling: 'w-full h-full object-cover',
  });
  avatarDiv?.appendChild(avatar);

  const userName = document.getElementById('username') as HTMLDivElement;
  userName.innerText = userInfo.name;

  const credits = document.getElementById('credits') as HTMLDivElement;
  credits.innerHTML = `
  <span class='text-2xl font-semibold'>${userInfo.credits}</span>
  <span>${Icon(iconPaths.credits, '#00000')}</span>
  `;

  const bio = document.getElementById('bio') as HTMLDivElement;
  bio.innerText = userInfo.bio;

  const listingsContainer = document.getElementById(
    'userListings'
  ) as HTMLDivElement;

  userListings.forEach((listing) => {
    const container = CreateElement({
      element: 'div',
      id: listing.id,
      styling:
        'bg-black text-white p-2 w-full max-w-[400px] cursor-pointer flex justify-evenly gap-4',
    });
    const title = CreateElement({ element: 'p', text: listing.title });

    const countDown = createCountdownHTML(listing.endsAt);

    const editButton = CreateElement({ element: 'button' });
    editButton.innerHTML = `${Icon(iconPaths.edit)}`;
    const deleteButton = CreateElement({ element: 'button' });
    deleteButton.innerHTML = `${Icon(iconPaths.delete)}`;

    container.append(title, countDown, editButton, deleteButton);
    listingsContainer.append(container);
  });
};

runPage();
