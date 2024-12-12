import { readPosts, searchPosts } from '../../../api/listing/read';
import {
  APIData,
  ListingObject,
  MakeListingType,
} from '../../../utilities/types';
import { makeSingleListing } from '../makeListings/homePageListing';
import { CreateElement } from './createElement';
import { makePagination } from './pagination';

export const MakeListing = async ({
  paginationDiv,
  section,
  page,
  limit,
  API = 'category',
  tag = '',
  search = '',
  sort = 'created',
  sortOrder = 'desc',
}: MakeListingType) => {
  let data: APIData;
  section.innerHTML = '';

  if (API === 'search') {
    data = await searchPosts({
      limit: limit,
      page: page,
      search: search,
    });
  } else if (API === 'category') {
    data = await readPosts({
      limit: limit,
      page: page,
      tag: tag,
      sortOrder: sortOrder,
      sort: sort,
    });
  } else {
    return;
  }

  if (data.data.length === 0) {
    const errorMessage = CreateElement<HTMLHeadingElement>({
      element: 'h1',
      text: 'No posts found!',
    });
    section.append(errorMessage);
    return;
  }

  data.data.forEach((post: ListingObject) => {
    makeSingleListing(post, section);
  });

  makePagination({
    meta: data.meta,
    container: section,
    paginationDiv: paginationDiv,
    API: API,
    tag: tag,
    search: search,
  });
};
