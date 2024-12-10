import { UpdateProfileInfo } from '../../utilities/types';
import { API } from '../APIEndPoints';
import { headers } from '../headers';

/**
 *
 * @param {string} username
 * @param {object} profileInfo - object that contains info about the profile - {avatar, banner, bio}
 * @param {object} profileInfo.avatar - object that contains url, and alt of the avatar (profile picture)
 * @param {object} profileInfo.banner . object that contains url, and alt of the banner (cover picture)
 * @param {string} profileInfo.bio - text that contains the bio of the profile
 *
 * @example
 * ```js
 * userProfile("Finn", {{url:"string",alt:"string"}, {url:"string", alt:"string"}, "Bio Text"})
 * ```
 */

export async function updateProfile(
  username: string,
  { avatar, banner, bio }: UpdateProfileInfo
) {
  try {
    const response = await fetch(API.AUCTION_PROFILES + '/' + username, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify({
        avatar: avatar,
        banner: banner,
        bio: bio,
      }),
    });
    if (response.ok) {
      alert('You updated your profile!');
      const data = await response.json();
      localStorage.setItem('userInfo', JSON.stringify(data.data));
      window.location.reload();
    }
  } catch (error) {
    alert('something went wrong trying to update your profile');
  }
}
