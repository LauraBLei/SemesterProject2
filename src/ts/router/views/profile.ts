import { readBidsByUser, readListingsByUser } from '../../api/listing/read';
import { readProfile } from '../../api/profile/read';
import { isAuctionClosed } from '../../ui/global/components/countdown';
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
  const exitUpdateProfile = document.getElementById(
    'exitUpdateProfile'
  ) as HTMLParagraphElement;
  const updateProfileDiv = document.getElementById(
    'updateProfileDiv'
  ) as HTMLDivElement;
  const form = document.getElementById('updateProfileForm');
  form?.addEventListener('submit', onUpdateProfile);
  exitUpdateProfile.addEventListener('click', () => {
    updateProfileDiv.classList.add('hidden');
  });
  await MakeProfile(userInfo);
  fillUpdateProfile(userInfo);
};

const MakeProfile = async (userInfo: UserProfileAPI) => {
  const fetchActiveListings = await readListingsByUser({
    username: userInfo.name,
    sort: 'created',
    sortOrder: 'desc',
  });
  const latestListingsHeadline = document.getElementById(
    'activeListingsHeadline'
  );
  const closedListingsHeadline = document.getElementById(
    'closedListingsHeadline'
  );
  const userBidsHeadline = document.getElementById('userBidsHeadline');
  const exploreHeadline = document.getElementById('exploreListingsHeadline');

  if (userInfo.wins.length === 0)
    document.getElementById('bidsWonHeadline')?.classList.add('hidden');

  const activeListings: ListingObject[] = fetchActiveListings.data;

  if (activeListings.length === 0)
    latestListingsHeadline?.classList.add('hidden');

  const fetchClosedListings = await readListingsByUser({
    username: userInfo.name,
    sort: 'endsAt',
    sortOrder: 'asc',
    active: false,
  });

  const closedListings: ListingObject[] = fetchClosedListings.data;
  const filteredClosedListings = closedListings.filter((e) =>
    isAuctionClosed(e.endsAt)
  );

  if (filteredClosedListings.length === 0)
    closedListingsHeadline?.classList.add('hidden');

  const fetchUserBids = await readBidsByUser({
    username: userInfo.name,
    sort: 'created',
    sortOrder: 'desc',
  });

  const userBids: Bid[] = fetchUserBids.data;
  if (userBids.length === 0) userBidsHeadline?.classList.add('hidden');

  const noListings =
    userBids.length === 0 &&
    closedListings.length === 0 &&
    activeListings.length === 0;
  if (noListings) exploreHeadline?.classList.remove('hidden');

  const bannerDiv = document.getElementById('banner');
  const banner = CreateElement<HTMLImageElement>({
    element: 'img',
    src: userInfo.banner.url,
    alt: userInfo.banner.alt,
    styling: 'w-full h-full object-cover',
  });
  bannerDiv?.appendChild(banner);

  const updateProfile = document.getElementById(
    'updateProfile'
  ) as HTMLDivElement;
  updateProfile.innerHTML = `${Icon(iconPaths.setting, '#E0B341', '30px')}
    `;
  updateProfile.addEventListener('click', () =>
    document.getElementById('updateProfileDiv')?.classList.remove('hidden')
  );

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
  <span>${Icon(iconPaths.credits, '#E0B341', '25px')}</span>
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

  const userWinContainer = document.getElementById('bidsWon') as HTMLDivElement;

  activeListings.forEach((listing: ListingObject) => {
    MakeListings(listing, activeListingsContainer, 'created');
  });
  filteredClosedListings.forEach((listing: ListingObject) => {
    MakeListings(listing, closedListingsContainer, 'closed');
  });
  userBids.forEach((listing: Bid) => {
    MakeUserBids(listing, userBidsContainer);
  });
  userInfo.wins.forEach((listing: ListingObject) => {
    MakeListings(listing, userWinContainer, 'wins');
  });
};

const fillUpdateProfile = (userInfo: UserProfileAPI) => {
  const avatar = document.getElementById('updateAvatar') as HTMLInputElement;
  avatar.value = userInfo.avatar.url;

  const banner = document.getElementById('updateBanner') as HTMLInputElement;
  banner.value = userInfo.banner.url;

  const bio = document.getElementById('updateBio') as HTMLTextAreaElement;
  if (userInfo.bio) bio.value = userInfo.bio; // Correctly set the textarea value

  const bioCounter = document.getElementById('bioCounter') as HTMLDivElement;
  bioCounter.innerHTML = `${userInfo.bio ? userInfo.bio.length : 0} / 200`;

  bio.addEventListener('input', (event) => {
    const currentLength = (event.target as HTMLTextAreaElement).value.length;
    bioCounter.innerText = `${currentLength} / 200`; // Update counter as user types
  });
};
