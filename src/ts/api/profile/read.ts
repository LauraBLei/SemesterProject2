import { API } from '../APIEndPoints';
import { headers } from '../headers';

/**
 *
 * @param {string} username - name of the user
 * @returns {Promise} - user info
 * @example
 * ```js
 * readProfile("Finn")
 * ```
 */

export async function readProfile(username: string) {
  const queryParameters = `?&_listings=true&_wins=true`;

  try {
    const response = await fetch(
      API.AUCTION_PROFILES + '/' + username + queryParameters,
      {
        method: 'GET',
        headers: headers(),
      }
    );
    if (response.ok) {
      const profileData = await response.json();

      return profileData.data;
    }
  } catch (error) {
    alert('something went wrong trying to get your profile information');
  }
}

export async function readCredits(username: string) {
  try {
    const response = await fetch(
      API.AUCTION_PROFILES + '/' + username + '/credits',
      {
        method: 'GET',
        headers: headers(),
      }
    );
    if (response.ok) {
      const profileData = await response.json();

      return profileData.data;
    }
  } catch (error) {}
}
