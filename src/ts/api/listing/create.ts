import { CreateForm } from '../../utilities/types';
import { API } from '../APIEndPoints';
import { headers } from '../headers';

/**
 * Makes a POST call to the API - creating a post
 * @param {object} postInfo - object with the post info in it (title, body, tags, media)
 * @param {string} postInfo.title - a string that is the title of the post.
 * @param {string} postInfo.body - a string of text that is the body of the post.
 * @param {Array} postInfo.tags - an array with strings, that are the tags of the post.
 * @param {object} postInfo.media - an object that includes url: "string", alt: "string".
 * @example
 * ```js
 * createPost({"PostTitle", "This is some text for the post", ["tagOne", "tagTwo"], {url: "SomeImageUrl", alt: "Some Image Text"}})
 * ```
 */

export async function createPost({
  title,
  description,
  tags,
  endsAt,
  media,
}: CreateForm) {
  const bodyElement = {
    title: title,
    description: description,
    tags: tags,
    endsAt: endsAt,
    media: media,
  };

  try {
    const response = await fetch(API.AUCTION_LISTINGS, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(bodyElement),
    });

    if (response.ok) {
      const div = document.getElementById('createListing');
      const form = document.getElementById('create') as HTMLFormElement;

      alert('You created a post!');
      div?.classList.add('hidden');
      form?.reset();
      window.location.href = '/';
    }
  } catch (error) {
    alert('Something went wrong trying to create a post!');
  }
}
