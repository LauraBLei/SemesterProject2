import { deletePost } from '../../api/listing/delete';

/**
 * Deletes selected posts
 * @param {object} event
 * @example
 * ```js
 * button.addEventListener("click", onDeletePost)
 * ```
 */
export async function onDeletePost(id: string) {
  await deletePost(id);

  location.reload();
}
