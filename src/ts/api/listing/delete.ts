import { API } from '../APIEndPoints';
import { headers } from '../headers';

/**
 * This will send a DELETE fetch call to the API - deleting a post.
 * @param {string} id - id of the post that should be deleted
 * @example
 * ```js
 * deletePost("708")
 * ```
 */

export async function deletePost(id: string) {
  try {
    const response = await fetch(API.AUCTION_LISTINGS + '/' + id, {
      method: 'DELETE',
      headers: headers(),
    });
    if (response.ok) {
      alert('Listing Deleted');
    }
  } catch (error) {
    alert('Something went wrong trying to delete listing');
  }
}
