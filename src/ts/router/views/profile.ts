import { readBidsByUser, readListingsByUser } from '../../api/listing/read';
import { readProfile } from '../../api/profile/read';
import { CreateElement } from '../../ui/global/components/createElement';
import { Icon } from '../../ui/global/components/makeIcon';
import {
  createCountdownHTML,
  isAuctionClosed,
} from '../../ui/global/countdown';
import { onDeletePost } from '../../ui/listing/delete';
import { onUpdateProfile } from '../../ui/profile/update';
import { iconPaths } from '../../utilities/enums';
import { Bid, ListingObject, UserProfileAPI } from '../../utilities/types';
import { MakeCreateOrEditForm } from './listingCreateEdit';

export const runProfile = async () => {
  const user = JSON.parse(localStorage.getItem('userInfo') ?? '');
  const userInfo: UserProfileAPI = await readProfile(user.name);
  const form = document.getElementById('updateProfile');
  form?.addEventListener('submit', onUpdateProfile);

  MakeProfile(userInfo);
};

const MakeProfile = async (userInfo: UserProfileAPI) => {
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

  console.log('active: ', activeListings);
  console.log('closed: ', closedListings);
  console.log('user bids: ', fetchUserBids);

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
  const details = CreateElement({ element: 'details' });
  const summary = CreateElement({
    element: 'summary',
    styling:
      ' list-none cursor-pointer scale-95 hover:scale-100 transition ease-in-out duration-300 transform',
  });
  summary.innerHTML = `${Icon(iconPaths.setting, '#1D1D1D', '30px')}
  `;
  const div = CreateElement({
    element: 'div',
    styling:
      'absolute z-20 bg-brandWhite border-2 rounded-md border-black w-[300px] md:w-[500px] p-4 h-auto',
  });

  makeUpdateProfileForm(div, userInfo);

  updateProfileDiv.append(details);
  details.append(summary, div);

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
  <span class='text-sm md:text-2xl font-semibold font-lato'>${userInfo.credits}</span>
  <span>${Icon(iconPaths.credits, '#00000', '20px')}</span>
  `;

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
    MakeListings(listing, activeListingsContainer);
  });
  closedListings.forEach((listing: ListingObject) => {
    MakeClosedListings(listing, closedListingsContainer);
  });
  userBids.forEach((listing: Bid) => {
    MakeUserBids(listing, userBidsContainer);
  });
};

const makeUpdateProfileForm = (
  container: HTMLDivElement,
  userInfo: UserProfileAPI
) => {
  const title = CreateElement({
    element: 'h2',
    text: 'Update Profile',
    styling:
      'font-playfairDisplay font-semibold text-brandBlack text-lg md:text-2xl text-center border-b-2 border-brandBlack py-2',
  });

  const form = CreateElement({
    element: 'form',
    id: 'updateProfile',
    styling: 'w-full flex flex-col gap-4 mt-2',
  });

  const avatarContainer = CreateElement({
    element: 'div',
    styling: 'flex flex-col gap-2 w-full',
  });
  const avatarLabel = CreateElement({
    element: 'label',
    forLabel: 'avatarUrl',
    text: 'Profile picture:',
    styling: 'text-lg font-semibold font-playfairDisplay text-brandBlack',
  });
  const avatarInput = CreateElement({
    element: 'input',
    type: 'url',
    name: 'avatarUrl',
    id: 'avatarUrl',
    placeholder: 'Profile Img url',
    value: `${userInfo.avatar.url}`,
    styling: 'w-full formInput',
    required: true,
  });

  const bannerContainer = CreateElement({
    element: 'div',
    styling: 'flex flex-col gap-2 w-full',
  });
  const bannerLabel = CreateElement({
    element: 'label',
    forLabel: 'bannerUrl',
    text: 'Cover picture:',
    styling: 'text-lg font-semibold font-playfairDisplay text-brandBlack',
  });
  const bannerInput = CreateElement({
    element: 'input',
    type: 'url',
    name: 'bannerUrl',
    id: 'bannerUrl',
    placeholder: 'Cover img url...',
    value: `${userInfo.banner.url}`,
    styling: 'w-full formInput',
    required: true,
  });

  const bio = CreateElement({
    element: 'textarea',
    name: 'bio',
    id: 'bioInput',
    placeholder: 'Write something about yourself...',
    required: true,
    styling: 'w-full min-h-[100px] formInput',
    text: `${userInfo.bio}`,
  });

  const submitButton = CreateElement({
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

const MakeListings = (
  listing: ListingObject,
  listingsContainer: HTMLDivElement
) => {
  const container = CreateElement({
    element: 'div',
    id: listing.id,
    styling:
      'bg-brandBlack text-brandWhite text-lg text-nowrap p-2 w-full  flex flex-col items-center gap-4 shadow-sm shadow-brandBlack',
  });
  const title = CreateElement({
    element: 'p',
    text: listing.title,
    styling: 'font-playfairDisplay font-semibold text-lg tracking-[8px]',
  });

  const countDown = createCountdownHTML(listing.endsAt);
  countDown.className =
    'font-playfairDisplay font-semibold text-lg tracking-widest';
  const editButton = CreateElement({
    element: 'button',
    styling:
      'scale-75 hover:scale-100 transition ease-in-out duration-300 transform cursor-pointer  ',
  });

  const buttonContainer = CreateElement({
    element: 'div',
    styling: 'w-full flex justify-evenly',
  });

  editButton.innerHTML = `${Icon(iconPaths.edit, '#E0B341')}`;
  editButton.addEventListener('click', () => {
    const div = document.getElementById('createEditContainer');
    div?.classList.remove('hidden');
    MakeCreateOrEditForm({ id: listing.id, edit: true });
  });

  const deleteButton = CreateElement({
    element: 'button',
    styling:
      'scale-75 hover:scale-100 transition ease-in-out duration-300 transform cursor-pointer  ',
  });
  deleteButton.innerHTML = `${Icon(iconPaths.delete, '#E0B341')}`;
  deleteButton.addEventListener('click', () => {
    onDeletePost(listing.id);
  });
  const seePost = CreateElement({
    element: 'a',
    href: '/listing/',
    styling:
      'scale-75 hover:scale-100 transition ease-in-out duration-300 transform cursor-pointer ',
  });
  seePost.addEventListener('click', () => {
    localStorage.setItem('id', JSON.stringify(listing.id));
  });
  seePost.innerHTML = `${Icon(iconPaths.eye, '#E0B341')}`;

  container.append(title, countDown, buttonContainer);
  buttonContainer.append(editButton, deleteButton, seePost);
  listingsContainer.append(container);
};

const MakeClosedListings = (
  listing: ListingObject,
  listingsContainer: HTMLDivElement
) => {
  if (!isAuctionClosed(listing.endsAt)) {
    return;
  }
  MakeListings(listing, listingsContainer);
};

const MakeUserBids = (
  listing: { listing: ListingObject; amount: number },
  listingsContainer: HTMLDivElement
) => {
  console.log(listing);

  const container = CreateElement({
    element: 'div',
    id: listing.listing.id,
    styling:
      'bg-brandBlack text-brandWhite text-lg text-nowrap p-2 w-full  flex flex-col items-center gap-4 shadow-sm shadow-brandBlack',
  });

  const title = CreateElement({
    element: 'p',
    text: listing.listing.title,
    styling:
      'font-playfairDisplay font-semibold text-lg tracking-[8px] text-wrap text-center',
  });

  const bid = CreateElement({
    element: 'p',
    text: `Bid: ${listing.amount}`,
    styling: 'font-lato font-semibold text-lg text-brandYellow tracking-[8px]',
  });

  const countDown = createCountdownHTML(listing.listing.endsAt);
  countDown.className =
    'font-playfairDisplay font-semibold text-lg tracking-[8px]';

  const seePost = CreateElement({
    element: 'a',
    href: '/listing/',
    styling:
      'scale-75 hover:scale-100 transition ease-in-out duration-300 transform cursor-pointer p-2 ',
  });
  seePost.addEventListener('click', () => {
    localStorage.setItem('id', JSON.stringify(listing.listing.id));
  });
  seePost.innerHTML = `${Icon(iconPaths.eye, '#E0B341')}`;

  container.append(title, bid, countDown, seePost);
  listingsContainer.append(container);
};
