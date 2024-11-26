import { ListingObject, ReadPostsAPI } from '../../utilities/types';
import { API } from '../APIEndPoints';
import { headers } from '../headers';

/**
 * Fetches one single post from the API
 * @param {string} id - id of the single post
 * @returns {Promise} data - a single post
 * @example
 * ```js
 * readPost("709")
 * ```
 */
export async function readListing(id: string) {
  const queryParameters = `?&_seller=true&_bids=true`;
  try {
    const response = await fetch(
      API.AUCTION_LISTINGS + '/' + id + queryParameters,
      {
        method: 'GET',
        headers: headers(),
      }
    );

    if (response.ok) {
      const data = await response.json();
      const post: ListingObject = data.data;
      return post;
    }
  } catch (error) {
    alert('something went wrong trying to fetch the post');
  }
}

/**
 * Fetches {limit} most recent posts from the API
 * @param {number} limit  - limit of posts per page (set to 12 if nothing is send in)
 * @param {number} page - chooses with page (set to 1 if nothing is send in)
 * @returns {Promise} userPosts - most recent posts
 *
 * @example
 * ```js
 * readPosts(12, 1)
 * readPosts()
 * ```
 */
export async function readPosts({
  limit = 12,
  page = 1,
  tag = '',
  sort,
  sortOrder,
  active,
}: ReadPostsAPI) {
  const queryParameters = `?limit=${limit}&page=${page}&_seller=true&_bids=true&_tag=${tag}&sort=${sort}&sortOrder=${sortOrder}&_active=${active}&`;

  try {
    const response = await fetch(API.AUCTION_LISTINGS + queryParameters, {
      method: 'GET',
      headers: headers(),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('blob', data);

      return data;
    }
  } catch (error) {
    alert('something went wrong trying to fetch user posts');
  }
}

/**
 * Fetches {limit} number of posts from a single user
 * @param {string} username - username of the chosen user
 * @param {number} limit  - limit of posts per page (set to 12 if nothing is send in)
 * @param {number} page - chooses with page (set to 1 if nothing is send in)
 * @returns
 * @example
 * ```js
 * readPostsByUser("Finn", 12, 1)
 * readPostsByUser("Finn")
 * ```
 */

export async function readPostsByUser(username: string, limit = 12, page = 1) {
  const queryParameters = `?limit=${limit}&page=${page}&_seller=true&_bids=true&`;

  try {
    const response = await fetch(
      API.AUCTION_LISTINGS + '/' + username + '/posts?' + queryParameters,
      {
        method: 'GET',
        headers: headers(),
      }
    );

    if (response.ok) {
      const data = await response.json();

      return data;
    }
  } catch (error) {
    alert('something went wrong trying to fetch user posts');
  }
}

export async function searchPosts({
  limit = 12,
  page = 1,
  search = '',
}: ReadPostsAPI) {
  const queryParameters = `?limit=${limit}&page=${page}&_seller=true&_bids=true&q=${search}`;

  try {
    const response = await fetch(API.SEARCH + queryParameters, {
      method: 'GET',
      headers: headers(),
    });

    if (response.ok) {
      const data = await response.json();

      return data;
    }
  } catch (error) {
    alert('something went wrong trying to fetch user posts');
    console.log(error);
  }
}
