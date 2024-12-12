import { updateProfile } from '../../api/profile/update';

/**
 * Gets form data - then sends the information to the API function
 * @param {object} event
 * @example
 * ```js
 * form.addEventListener("submit", onUpdateProfile)
 * ```
 */
export async function onUpdateProfile(event: SubmitEvent) {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const userinfo = JSON.parse(localStorage.getItem('userInfo') ?? '');
  const username = userinfo.name;

  const formData = new FormData(form);

  const avatar: { url: FormDataEntryValue; alt: string } = {
    url: formData.get('avatarUrl') ?? '',
    alt: 'Profile Image',
  };

  const banner: { url: FormDataEntryValue; alt: string } = {
    url: formData.get('bannerUrl') ?? '',
    alt: 'Cover image',
  };

  updateProfile(username, {
    avatar: avatar,
    banner: banner,
    bio: formData.get('bio') ?? '',
  });
}
