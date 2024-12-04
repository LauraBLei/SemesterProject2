import { readPosts, searchPosts } from '../../../api/listing/read';
import { Icon } from './makeIcon';
import { iconPaths } from '../../../utilities/enums';
import {
  APIData,
  ListingObject,
  MakeListingType,
  MakePaginationType,
} from '../../../utilities/types';
import { CreateElement } from './createElement';
import { createCountdownHTML } from '../countdown';

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
    const errorMessage = CreateElement({
      element: 'h1',
      text: 'No posts found!',
    });
    section.append(errorMessage);
    return;
  }

  data.data.forEach((post) => {
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

export const makeSingleListing = (
  post: ListingObject,
  section: HTMLDivElement
) => {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length === 0) return '*No text found*';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };
  const croppedTitle = truncateText(post.title, 15);
  const croppedDescription = truncateText(post.description, 50);

  const container = CreateElement({
    element: 'div',
    styling:
      'w-full md:w-[350px] h-auto bg-brandBlack shadow-sm shadow-brandBlack p-3 rounded-md flex flex-col justify-evenly',
  });

  const imageDiv = CreateElement({
    element: 'div',
    styling:
      'w-full h-[200px] flex items-center justify-center rounded-md overflow-hidden',
  });
  if (post.media[0]) {
    const image = CreateElement({
      element: 'img',
      styling: 'w-full h-full object-cover',
      src: `${post.media[0].url}`,
      alt: `${post.media[0].alt}`,
    });
    imageDiv.append(image);
  } else {
    const image = CreateElement({
      element: 'img',
      styling: 'w-full h-full object-cover',
      src: `/placeholder.jpg`,
      alt: `Image not found`,
    });
    imageDiv.append(image);
  }

  const title = CreateElement({
    element: 'h2',
    styling:
      'text-white font-playfairDisplay font-semibold  text-center text-lg md:text-2xl py-2',
    text: croppedTitle,
  });

  const description = CreateElement({
    element: 'p',
    text: croppedDescription,
    styling:
      'text-white border-y-2 border-white font-lato text-sm md:text-lg py-2 overflow-x-auto max-h-[100px]  py-4 overflow-hidden ',
  });

  const countDown = createCountdownHTML(post.endsAt);
  countDown.className = 'text-2xl text-center py-2 text-brandWhite';

  const userInfoDiv = CreateElement({
    element: 'div',
    styling: 'flex gap-5 items-center py-4',
  });

  const profileImageDiv = CreateElement({
    element: 'div',
    styling: 'h-[40px] w-[40px] overflow-hidden rounded-full',
  });

  const profileImage = CreateElement({
    element: 'img',
    styling: 'object-cover w-full h-full',
    src: `${post.seller.avatar.url}`,
  });

  const username = CreateElement({
    element: 'p',
    styling: 'text-lg lg:text-2xl text-white font-lato',
    text: `${post.seller.name}`,
  });

  const seePost = CreateElement({
    element: 'a',
    href: '/listing/',
    styling:
      'scale-90 rounded-md hover:scale-100 transition ease-in-out duration-300 transform cursor-pointer p-2 hover:bg-brandGreen w-full flex justify-center text-white text-2xl items-end gap-3',
  });
  seePost.addEventListener('click', () => {
    localStorage.setItem('id', JSON.stringify(post.id));
  });
  seePost.innerHTML = `${Icon(iconPaths.eye, '#E0B341', '30px')}`;

  section?.append(container);
  container.append(
    imageDiv,
    title,
    description,
    countDown,
    userInfoDiv,
    seePost
  );
  userInfoDiv.append(profileImageDiv, username);
  profileImageDiv.appendChild(profileImage);
};

export const makePagination = ({
  meta,
  container,
  API,
  tag,
  search,
  paginationDiv,
}: MakePaginationType) => {
  const currentPage = meta.currentPage;
  const nextPage = meta.nextPage;
  const previousPage = meta.previousPage;
  const lastPage = meta.pageCount;
  paginationDiv.innerHTML = '';

  const pageChoiceContainer = CreateElement({
    element: 'div',
    styling: 'flex gap-4',
  });

  const firstPage = CreateElement({
    element: 'p',
    id: 'firstPage',
    text: 'First page',
    styling:
      'text-2xl font-playfairDisplay font-semibold cursor-pointer scale-75 hover:scale-100  transition-transform duration-300 ease-in-out transform',
  });
  paginationDiv.append(firstPage);
  firstPage.addEventListener('click', () =>
    MakeListing({
      limit: 12,
      page: 1,
      search: search,
      tag: tag,
      paginationDiv: paginationDiv,
      section: container,
      API: API,
    })
  );
  paginationDiv.append(pageChoiceContainer);
  if (meta.isFirstPage === false) {
    const previousPageElement = CreateElement({
      element: 'p',
      id: 'prev',
      text: `${previousPage}`,
      styling:
        'text-2xl font-playfairDisplay font-semibold cursor-pointer scale-75 hover:scale-100  transition-transform duration-300 ease-in-out transform',
    });
    pageChoiceContainer.append(previousPageElement);

    previousPageElement.addEventListener('click', () =>
      MakeListing({
        limit: 12,
        page: previousPage,
        search: search,
        tag: tag,
        paginationDiv: paginationDiv,
        section: container,
        API: API,
      })
    );
  }

  const currentPageElement = CreateElement({
    element: 'p',
    id: 'current',
    text: `${currentPage}`,
    styling: 'font-bold font-playfairDisplay text-3xl',
  });
  pageChoiceContainer.append(currentPageElement);

  const lastPageNumber = CreateElement({
    element: 'p',
    text: `Last page`,
    styling:
      'text-2xl font-playfairDisplay font-semibold cursor-pointer scale-75 hover:scale-100  transition-transform duration-300 ease-in-out transform',
  });
  paginationDiv.append(lastPageNumber);
  lastPageNumber.addEventListener('click', () =>
    MakeListing({
      limit: 12,
      page: lastPage,
      search: search,
      tag: tag,
      paginationDiv: paginationDiv,
      section: container,
      API: API,
    })
  );
  if (meta.isLastPage === false) {
    const nextPageElement = CreateElement({
      element: 'p',
      id: 'next',
      text: `${nextPage}`,
      styling:
        'text-2xl font-playfairDisplay font-semibold cursor-pointer scale-75 hover:scale-100  transition-transform duration-300 ease-in-out transform',
    });
    pageChoiceContainer.append(nextPageElement);

    nextPageElement.addEventListener('click', () =>
      MakeListing({
        limit: 12,
        page: nextPage,
        search: search,
        tag: tag,
        paginationDiv: paginationDiv,
        section: container,
        API: API,
      })
    );
  }
};
