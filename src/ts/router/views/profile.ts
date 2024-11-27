import { readProfile } from '../../api/profile/read';
import { createCountdownHTML } from '../../ui/global/countdown';
import { onUpdateProfile } from '../../ui/profile/update';
import { CreateElement, Icon } from '../../utilities/components';
import { iconPaths } from '../../utilities/enums';
import { UserProfileAPI } from '../../utilities/types';
import { MakeCreateOrEditForm } from './listingCreateEdit';

const runPage = async () => {
  const user = JSON.parse(localStorage.getItem('userInfo') ?? '');
  const userInfo: UserProfileAPI = await readProfile(user.name);
  const form = document.getElementById('updateProfile');
  form?.addEventListener('submit', onUpdateProfile);
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
  div.innerHTML = `
  <h2 class='headline text-center'>Update Profile</h2>
      <form class='flex flex-col gap-4 items-center w-full' id="updateProfile">
      <div class='flex flex-col gap-2 w-full'>
      <label class='text-2xl font-semibold' for="avatarUrl">Profile picture:</label>
      <input
        class='w-full border-2 border-black p-2'
        type="url"
        name="avatarUrl"
        id="avatarUrl"
        placeholder="Profile Img url..."
        value=${userInfo.avatar.url}
      />
      </div>
      <div class='flex flex-col gap-2 w-full'>
      <label class='text-2xl font-semibold' for="bannerUrl">Cover picture:</label>
      <input
        class='w-full border-2 border-black p-2'
        type="url"
        name="bannerUrl"
        id="bannerUrl"
        placeholder="Cover img url..."
        value = ${userInfo.banner.url}
      />
      </div>
        <textarea
          class='w-full min-h-[200px] border-2 border-black p-2'
          name="bio"
          id="bioInput"
          placeholder="write something about yourself..."
        >${userInfo.bio}</textarea>
        <button type='submit' class='border-2 border-black py-2 px-4 scale-95 hover:scale-100 transition ease-in-out duration-300 transform' type="submit">Update</button>
      </form>
  `;

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

  const listingsContainer = document.getElementById(
    'userListings'
  ) as HTMLDivElement;

  userListings.forEach((listing) => {
    const container = CreateElement({
      element: 'div',
      id: listing.id,
      styling:
        'bg-black text-white p-2 w-full max-w-[400px] cursor-pointer flex justify-evenly gap-4 scale-95 hover:scale-100 transition ease-in-out duration-300 transform',
    });
    const title = CreateElement({ element: 'p', text: listing.title });

    const countDown = createCountdownHTML(listing.endsAt);

    const editButton = CreateElement({ element: 'button' });
    editButton.innerHTML = `${Icon(iconPaths.edit)}`;
    editButton.addEventListener('click', () => {
      const div = document.getElementById('createEditContainer');
      div?.classList.remove('hidden');
      MakeCreateOrEditForm({ id: listing.id, edit: true });
    });

    const deleteButton = CreateElement({ element: 'button' });
    deleteButton.innerHTML = `${Icon(iconPaths.delete)}`;

    container.append(title, countDown, editButton, deleteButton);
    listingsContainer.append(container);
  });
};

const makeUpdateProfileForm = (container: HTMLDivElement) => {
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

  container.append(title);
};

runPage();
