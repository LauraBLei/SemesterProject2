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

const runPage = async () => {
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
  summary.innerHTML = `${Icon(iconPaths.setting, '#00000', '40px')}
  `;
  const div = CreateElement({
    element: 'div',
    styling:
      'absolute z-20 bg-white border-2 border-black max-w-[500px] w-full p-4 max-h-[300px] overflow-y-auto',
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
  <span class='text-2xl font-semibold'>${userInfo.credits}</span>
  <span>${Icon(iconPaths.credits, '#00000')}</span>
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
    MakeActiveListings(listing, activeListingsContainer);
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
    styling: 'headline text-center',
  });

  const form = CreateElement({
    element: 'form',
    id: 'updateProfile',
    styling: 'flex flex-col gap-4 items-center w-full',
  });

  const avatarContainer = CreateElement({
    element: 'div',
    styling: 'flex flex-col gap-2 w-full',
  });
  const avatarLabel = CreateElement({
    element: 'label',
    forLabel: 'avatarUrl',
    text: 'Profile picture:',
    styling: 'text-2xl font-semibold',
  });
  const avatarInput = CreateElement({
    element: 'input',
    type: 'url',
    name: 'avatarUrl',
    id: 'avatarUrl',
    placeholder: 'Profile Img url',
    value: `${userInfo.avatar.url}`,
    styling: 'w-full border-2 border-black p-2',
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
  });
  const bannerInput = CreateElement({
    element: 'input',
    type: 'url',
    name: 'bannerUrl',
    id: 'bannerUrl',
    placeholder: 'Cover img url...',
    value: `${userInfo.banner.url}`,
    styling: 'w-full border-2 border-black p-2',
    required: true,
  });

  const bio = CreateElement({
    element: 'textarea',
    name: 'bio',
    id: 'bioInput',
    placeholder: 'Write something about yourself...',
    required: true,
    styling: 'w-full min-h-[200px] border-2 border-black p-2',
    text: `${userInfo.bio}`,
  });

  const submitButton = CreateElement({
    element: 'button',
    text: 'Update',
    type: 'submit',
    styling:
      'border-2 border-black py-2 px-4 scale-95 hover:scale-100 transition ease-in-out duration-300 transform',
  });

  container.append(title, form);
  form.append(avatarContainer, bannerContainer, bio, submitButton);
  avatarContainer.append(avatarLabel, avatarInput);
  bannerContainer.append(bannerLabel, bannerInput);
};

const MakeActiveListings = (
  listing: ListingObject,
  listingsContainer: HTMLDivElement
) => {
  const container = CreateElement({
    element: 'div',
    id: listing.id,
    styling:
      'bg-black text-white p-2 w-full  flex justify-evenly items-center gap-4',
  });
  const title = CreateElement({ element: 'p', text: listing.title });

  const countDown = createCountdownHTML(listing.endsAt);

  const editButton = CreateElement({
    element: 'button',
    styling:
      'scale-90 hover:scale-100 transition ease-in-out duration-300 transform cursor-pointer p-2 hover:bg-green-900',
  });
  editButton.innerHTML = `${Icon(iconPaths.edit)}`;
  editButton.addEventListener('click', () => {
    const div = document.getElementById('createEditContainer');
    div?.classList.remove('hidden');
    MakeCreateOrEditForm({ id: listing.id, edit: true });
  });

  const deleteButton = CreateElement({
    element: 'button',
    styling:
      'scale-90 hover:scale-100 transition ease-in-out duration-300 transform cursor-pointer p-2 hover:bg-green-900',
  });
  deleteButton.innerHTML = `${Icon(iconPaths.delete)}`;
  deleteButton.addEventListener('click', () => {
    onDeletePost(listing.id);
  });
  const seePost = CreateElement({
    element: 'a',
    href: '/listing/',
    styling:
      'scale-90 hover:scale-100 transition ease-in-out duration-300 transform cursor-pointer p-2 hover:bg-green-900',
  });
  seePost.addEventListener('click', () => {
    localStorage.setItem('id', JSON.stringify(listing.id));
  });
  seePost.innerHTML = `${Icon(iconPaths.eye)}`;

  container.append(title, countDown, editButton, deleteButton, seePost);
  listingsContainer.append(container);
};

const MakeClosedListings = (
  listing: ListingObject,
  listingsContainer: HTMLDivElement
) => {
  if (!isAuctionClosed(listing.endsAt)) {
    return;
  }
  const container = CreateElement({
    element: 'div',
    id: listing.id,
    styling:
      'bg-black text-white p-2 w-full flex justify-evenly items-center gap-4',
  });
  const title = CreateElement({ element: 'p', text: listing.title });

  const countDown = createCountdownHTML(listing.endsAt);

  const editButton = CreateElement({
    element: 'button',
    styling:
      'scale-90 hover:scale-100 transition ease-in-out duration-300 transform cursor-pointer p-2 hover:bg-green-900',
  });
  editButton.innerHTML = `${Icon(iconPaths.edit)}`;
  editButton.addEventListener('click', () => {
    const div = document.getElementById('createEditContainer');
    div?.classList.remove('hidden');
    MakeCreateOrEditForm({ id: listing.id, edit: true });
  });

  const deleteButton = CreateElement({
    element: 'button',
    styling:
      'scale-90 hover:scale-100 transition ease-in-out duration-300 transform cursor-pointer p-2 hover:bg-green-900',
  });
  deleteButton.innerHTML = `${Icon(iconPaths.delete)}`;
  deleteButton.addEventListener('click', () => {
    onDeletePost(listing.id);
  });
  const seePost = CreateElement({
    element: 'a',
    href: '/listing/',
    styling:
      'scale-90 hover:scale-100 transition ease-in-out duration-300 transform cursor-pointer p-2 hover:bg-green-900',
  });
  seePost.addEventListener('click', () => {
    localStorage.setItem('id', JSON.stringify(listing.id));
  });
  seePost.innerHTML = `${Icon(iconPaths.eye)}`;

  container.append(title, countDown, editButton, deleteButton, seePost);
  listingsContainer.append(container);
};

const MakeUserBids = (listing: Bid, listingsContainer: HTMLDivElement) => {
  const container = CreateElement({
    element: 'div',
    id: listing.id,
    styling: 'bg-black w-full text-white flex justify-evenly ',
  });
  const title = CreateElement({ element: 'p', text: listing.listing.title });

  const countDown = createCountdownHTML(listing.listing.endsAt);

  const bidDiv = CreateElement({ element: 'div', styling: 'flex gap-2' });
  const bid = CreateElement({ element: 'p', text: `${listing.amount}` });
  const icon = CreateElement({ element: 'div' });
  icon.innerHTML = `${Icon(iconPaths.credits)}`;

  const seePost = CreateElement({
    element: 'a',
    href: '/listing/',
    styling:
      'scale-90 hover:scale-100 transition ease-in-out duration-300 transform cursor-pointer p-2 hover:bg-green-900',
  });
  seePost.addEventListener('click', () => {
    localStorage.setItem('id', JSON.stringify(listing.listing.id));
  });
  seePost.innerHTML = `${Icon(iconPaths.eye)}`;

  container.append(title, countDown, bidDiv, seePost);
  listingsContainer.append(container);
  bidDiv.append(bid, icon);
};
runPage();
