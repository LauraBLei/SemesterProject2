import { readPosts, searchPosts } from '../api/listing/read';
import { iconPaths } from './enums';
import { categories } from './objects';
import {
  ElementHelper,
  ListingObject,
  MakeListingType,
  APIData,
  MakePaginationType,
} from './types';

export const Icon = (
  path: string,
  color: string = '#FFFFFF',
  size: string = '30px'
) => {
  return `
      <svg xmlns="http://www.w3.org/2000/svg" height="${size}" viewBox="0 -960 960 960" width="${size}" fill="${color}"><path d="${path}"/></svg>
      `;
};

export const CreateElement = ({
  element,
  styling,
  text,
  id,
  href,
  src,
  alt,
  type,
  name,
  value,
  required,
  forLabel,
  placeholder,
}: ElementHelper) => {
  const item = document.createElement(element);
  if (text) item.innerText = text;
  if (id) item.id = id;
  if (styling) item.className = styling;
  if (href) item.href = href;
  if (src) item.src = src;
  if (alt) item.alt = alt;
  if (name) item.name = name;
  if (type) item.type = type;
  if (value) item.value = value;
  if (required) item.required;
  if (forLabel) item.htmlFor = forLabel;
  if (placeholder) item.placeholder = placeholder;
  return item;
};

export const CreateCategory = (section: HTMLElement) => {
  const paginationDiv = document.getElementById('pagination') as HTMLDivElement;
  const searchListingDiv = document.getElementById(
    'searchListings'
  ) as HTMLDivElement;
  categories.forEach((key) => {
    const container = CreateElement({
      element: 'a',
      styling:
        'flex flex-col items-center scale-90 hover:scale-100 transition-transform duration-300 ease-in-out transform',
    });
    const imageDiv = CreateElement({
      element: 'div',
      styling: 'rounded-full h-[162px] w-[162px] overflow-hidden',
    });
    const image = CreateElement({
      element: 'img',
      src: `${key.src}`,
      alt: `${key.text}`,
      styling: 'object-cover h-full w-full',
    });

    container.addEventListener('click', () => {
      MakeListing({
        API: 'category',
        limit: 12,
        page: 1,
        tag: key.tag,
        paginationDiv: paginationDiv,
        section: searchListingDiv,
      });
    });

    const category = CreateElement({ element: 'p', text: `${key.text}` });
    section?.appendChild(container);
    container.append(imageDiv, category);
    imageDiv.appendChild(image);
  });
};

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
  const container = CreateElement({
    element: 'div',
    styling:
      'max-w-[410px] max-h-[650] w-full h- full bg-black p-6 rounded-md m-4 justify-between',
  });

  const imageDiv = CreateElement({
    element: 'div',
    styling:
      'overflow-hidden w-[350px] h-[350px] flex items-center justify-center',
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
    styling: 'text-white  text-center text-2xl py-2',
    text: `${post.title}`,
  });

  const description = CreateElement({
    element: 'p',
    text: `${post.description}`,
    styling: 'text-white py-2 overflow-x-auto',
  });
  if (post.description) {
    description.classList.add('border-y-2');
    description.classList.add('border-white');
  }

  const userInfoDiv = CreateElement({
    element: 'div',
    styling: 'flex gap-5 items-center py-4',
  });

  const profileImageDiv = CreateElement({
    element: 'div',
    styling: 'h-[62px] w-[62px] overflow-hidden rounded-full',
  });

  const profileImage = CreateElement({
    element: 'img',
    styling: 'object-cover w-full h-full',
    src: `${post.seller.avatar.url}`,
  });

  const username = CreateElement({
    element: 'p',
    styling: 'text-2xl text-white',
    text: `${post.seller.name}`,
  });

  const seePost = CreateElement({
    element: 'a',
    href: '/listing/',
    styling:
      'scale-90 hover:scale-100 transition ease-in-out duration-300 transform cursor-pointer p-2 hover:bg-green-900 w-full flex justify-center text-white text-2xl items-end gap-3',
  });
  seePost.addEventListener('click', () => {
    localStorage.setItem('id', JSON.stringify(post.id));
  });
  seePost.innerHTML = `View ${Icon(iconPaths.eye)}`;

  section?.append(container);
  container.append(imageDiv, title, description, userInfoDiv, seePost);
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
    text: '1',
    styling:
      'text-2xl font-semibold cursor-pointer scale-95 hover:scale-100 transition ease-in-out duration-300 transform',
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
        'text-2xl font-semibold cursor-pointer scale-75 hover:scale-100  transition-transform duration-300 ease-in-out transform',
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
    styling: 'font-bold text-3xl',
  });
  pageChoiceContainer.append(currentPageElement);

  const lastPageNumber = CreateElement({
    element: 'p',
    text: `${lastPage}`,
    styling:
      'text-2xl font-semibold cursor-pointer scale-75 hover:scale-100  transition-transform duration-300 ease-in-out transform',
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
        'text-2xl font-semibold cursor-pointer scale-75 hover:scale-100  transition-transform duration-300 ease-in-out transform',
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
