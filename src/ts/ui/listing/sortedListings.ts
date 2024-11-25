import { readPosts, searchPosts } from '../../api/listing/read';
import { CreateElement, MakeListing } from '../../utilities/components';
import { readPostsAPI } from '../../utilities/types';

export const searchListings = async (
  API: string,
  { page = 1, limit = 12, search, tag }: readPostsAPI
) => {
  const container = document.getElementById('searchListings') as HTMLDivElement;
  container.innerHTML = '';
  const paginationDiv = document.getElementById('pagination') as HTMLDivElement;

  //   container.innerHTML = '';

  if (API === 'search') {
    const posts = await searchPosts({
      limit: limit,
      page: page,
      search: search,
    });
    console.log('sorted posts: ', posts);

    if (posts.length === 0) {
      const errorMessage = CreateElement({
        element: 'h1',
        text: 'No posts found!',
      });
      container.append(errorMessage);
      return;
    }
    MakeListing({
      paginationDiv: paginationDiv,
      section: container,
      posts: posts,
      API: 'search',
      search: search,
    });
  } else if (API === 'category') {
    const posts = await readPosts({
      limit: limit,
      page: page,
      tag: tag,
      sortOrder: 'desc',
      sort: 'created',
    });
    console.log('sorted posts: ', posts);

    if (posts.length === 0) {
      const errorMessage = CreateElement({
        element: 'h1',
        text: 'No posts found!',
      });
      container.append(errorMessage);
      return;
    }
    MakeListing({
      paginationDiv: paginationDiv,
      section: container,
      posts: posts,
      API: 'category',
      tag: tag,
    });
  }
};
