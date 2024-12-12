import { readBidsByUser, readListingsByUser } from '../../api/listing/read';
import { readProfile } from '../../api/profile/read';
import { CreateElement } from '../../ui/global/components/createElement';
import { Icon } from '../../ui/global/components/makeIcon';
import {
  MakeListings,
  MakeUserBids,
} from '../../ui/global/makeListings/profileListings';
import { onUpdateProfile } from '../../ui/profile/update';
import { iconPaths } from '../../utilities/enums';
import { Bid, ListingObject, UserProfileAPI } from '../../utilities/types';

export const runProfile = async () => {
  const user = JSON.parse(localStorage.getItem('userInfo') ?? '{}');
  const userInfo: UserProfileAPI = await readProfile(user.name);
  const form = document.getElementById('updateProfile');
  form?.addEventListener('submit', onUpdateProfile);

  await MakeProfile(userInfo);
};

const MakeProfile = async (userInfo: UserProfileAPI) => {
  const savedTheme = localStorage.getItem('theme');

  const fetchActiveListings = await readListingsByUser({
    username: userInfo.name,
    sort: 'created',
    sortOrder: 'desc',
  });

  const activeListings: ListingObject[] = fetchActiveListings.data;

  const fetchClosedListings = await readListingsByUser({
    username: userInfo.name,
    sort: 'endsAt',
    sortOrder: 'asc',
  });

  const closedListings: ListingObject[] = fetchClosedListings.data;

  const fetchUserBids = await readBidsByUser({
    username: userInfo.name,
    sort: 'created',
    sortOrder: 'desc',
  });

  const userBids: Bid[] = fetchUserBids.data;

  const bannerDiv = document.getElementById('banner');
  const banner = CreateElement<HTMLImageElement>({
    element: 'img',
    src: userInfo.banner.url,
    alt: userInfo.banner.alt,
    styling: 'w-full h-full object-cover',
  });
  bannerDiv?.appendChild(banner);

  const updateProfileDiv = document.getElementById(
    'updateProfile'
  ) as HTMLDivElement;
  const details = CreateElement<HTMLDetailsElement>({ element: 'details' });
  const summary = CreateElement<HTMLElement>({
    element: 'summary',
    styling:
      ' list-none cursor-pointer scale-95 hover:scale-100 transition ease-in-out duration-300 transform',
  });

  const div = CreateElement<HTMLDivElement>({
    element: 'div',
    styling:
      'absolute z-20 bg-brandWhite border-2 rounded-md border-black w-[300px] md:w-[500px] p-4 h-auto',
  });

  makeUpdateProfileForm(div, userInfo);

  updateProfileDiv.append(details);
  details.append(summary, div);

  const avatarDiv = document.getElementById('avatar') as HTMLDivElement;
  const avatar = CreateElement<HTMLImageElement>({
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
  <span class='text-sm md:text-2xl font-semibold font-lato'>${userInfo.credits}</span>
  <span>${Icon(iconPaths.credits, '#00000', '20px')}</span>
  `;
  if (savedTheme === 'dark') {
    summary.innerHTML = `${Icon(iconPaths.setting, '#FFFFFF', '30px')}
    `;
    credits.innerHTML = `
  <span class='text-sm md:text-2xl font-semibold font-lato'>${userInfo.credits}</span>
  <span>${Icon(iconPaths.credits, '#FFFFFF', '25px')}</span>
  `;
  } else {
    summary.innerHTML = `${Icon(iconPaths.setting, '#1D1D1D', '30px')}
    `;
    credits.innerHTML = `
  <span class='text-sm md:text-2xl font-semibold font-lato'>${userInfo.credits}</span>
  <span>${Icon(iconPaths.credits, '#00000', '25px')}</span>
  `;
  }
  const bio = document.getElementById('bio') as HTMLDivElement;
  bio.innerText = userInfo.bio;

  const activeListingsContainer = document.getElementById(
    'activeListings'
  ) as HTMLDivElement;

  const closedListingsContainer = document.getElementById(
    'closedListings'
  ) as HTMLDivElement;

  const userBidsContainer = document.getElementById(
    'userBids'
  ) as HTMLDivElement;

  activeListings.forEach((listing: ListingObject) => {
    MakeListings(listing, activeListingsContainer, 'created');
  });
  closedListings.forEach((listing: ListingObject) => {
    MakeListings(listing, closedListingsContainer, 'closed');
  });
  userBids.forEach((listing: Bid) => {
    MakeUserBids(listing, userBidsContainer);
  });
};

const makeUpdateProfileForm = (
  container: HTMLDivElement,
  userInfo: UserProfileAPI
) => {
  const title = CreateElement<HTMLHeadingElement>({
    element: 'h2',
    text: 'Update Profile',
    styling:
      'font-playfairDisplay font-semibold text-brandBlack text-lg md:text-2xl text-center border-b-2 border-brandBlack py-2',
  });

  const form = CreateElement<HTMLFormElement>({
    element: 'form',
    id: 'updateProfile',
    styling: 'w-full flex flex-col gap-4 mt-2',
  });

  const avatarContainer = CreateElement<HTMLDivElement>({
    element: 'div',
    styling: 'flex flex-col gap-2 w-full',
  });
  const avatarLabel = CreateElement<HTMLLabelElement>({
    element: 'label',
    forLabel: 'avatarUrl',
    text: 'Profile picture:',
    styling: 'text-lg font-semibold font-playfairDisplay text-brandBlack',
  });
  const avatarInput = CreateElement<HTMLInputElement>({
    element: 'input',
    type: 'url',
    name: 'avatarUrl',
    id: 'avatarUrl',
    placeholder: 'Profile Img url',
    value: `${userInfo.avatar.url}`,
    styling: 'w-full formInput',
    required: true,
  });

  const bannerContainer = CreateElement<HTMLDivElement>({
    element: 'div',
    styling: 'flex flex-col gap-2 w-full',
  });
  const bannerLabel = CreateElement<HTMLLabelElement>({
    element: 'label',
    forLabel: 'bannerUrl',
    text: 'Cover picture:',
    styling: 'text-lg font-semibold font-playfairDisplay text-brandBlack',
  });
  const bannerInput = CreateElement<HTMLInputElement>({
    element: 'input',
    type: 'url',
    name: 'bannerUrl',
    id: 'bannerUrl',
    placeholder: 'Cover img url...',
    value: `${userInfo.banner.url}`,
    styling: 'w-full formInput',
    required: true,
  });

  const bio = CreateElement<HTMLTextAreaElement>({
    element: 'textarea',
    name: 'bio',
    id: 'bioInput',
    placeholder: 'Write something about yourself...',
    required: true,
    styling: 'w-full min-h-[100px] formInput',
    text: `${userInfo.bio}`,
  });

  const submitButton = CreateElement<HTMLButtonElement>({
    element: 'button',
    text: 'Update',
    type: 'submit',
    styling:
      'border-2 text-brandGreen tracking-widest font-semibold text-2xl border-brandGreen hover:bg-brandBlack hover:text-brandYellow py-2 px-4 scale-95 hover:scale-100 transition ease-in-out duration-300 transform',
  });

  container.append(title, form);
  form.append(avatarContainer, bannerContainer, bio, submitButton);
  avatarContainer.append(avatarLabel, avatarInput);
  bannerContainer.append(bannerLabel, bannerInput);
};
