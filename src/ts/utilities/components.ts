import { searchListings } from '../ui/listing/sortedListings';
import { categories } from './objects';
import { ElementHelper, meta, listingObject, makeListing } from './types';

export const Icon = (path: string) => {
  return `
      <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#e8eaed"><path d="${path}"/></svg>
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
}: ElementHelper) => {
  const item = document.createElement(element);
  item.innerText = text ?? '';
  item.id = id ?? '';
  item.className = styling ?? '';
  if (href) {
    item.href = href;
  }
  item.src = src ?? '';
  item.alt = alt ?? '';
  return item;
};

export const CreateCategory = (section: HTMLElement) => {
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
      searchListings('category', { limit: 12, page: 1, tag: key.tag });
    });

    const category = CreateElement({ element: 'p', text: `${key.text}` });
    section?.appendChild(container);
    container.append(imageDiv, category);
    imageDiv.appendChild(image);
  });
};

export const MakeListing = ({
  paginationDiv,
  section,
  posts,
  API = 'category',
  tag = '',
  search = '',
}: makeListing) => {
  console.log(posts);

  posts.data.forEach((post) => {
    makeSingleListing(post, section);
  });

  makePagination(posts.meta, paginationDiv, API, tag, search);
};

export const makeSingleListing = (
  post: listingObject,
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

  section?.append(container);
  container.append(imageDiv, title, description, userInfoDiv);
  userInfoDiv.append(profileImageDiv, username);
  profileImageDiv.appendChild(profileImage);
};

export const makePagination = (
  meta: meta,
  container: HTMLDivElement,
  API: string,
  tag: string,
  search: FormDataEntryValue
) => {
  const currentPage = meta.currentPage;
  const nextPage = meta.nextPage;
  const previousPage = meta.previousPage;
  container.innerHTML = '';
  if (meta.isFirstPage === false) {
    const previousPageElement = CreateElement({
      element: 'p',
      text: `${previousPage}`,
      styling:
        'text-2xl font-semibold cursor-pointer scale-95 hover:scale-100 transition ease-in-out duration-300 transform',
    });
    container.append(previousPageElement);
    if (API === 'search') {
      previousPageElement.addEventListener('click', () =>
        searchListings(API, { limit: 12, page: nextPage, search: search })
      );
    } else if (API === 'category') {
      previousPageElement.addEventListener('click', () =>
        searchListings(API, { limit: 12, page: nextPage, tag: tag })
      );
    }
  }
  const currentPageElement = CreateElement({
    element: 'p',
    text: `${currentPage}`,
    styling: 'font-bold text-3xl',
  });
  container.append(currentPageElement);

  if (meta.isLastPage === false) {
    const nextPageElement = CreateElement({
      element: 'p',
      text: `${nextPage}`,
      styling:
        'text-2xl font-semibold cursor-pointer scale-75 hover:scale-100  transition-transform duration-300 ease-in-out transform',
    });
    container.append(nextPageElement);
    if (API === 'search') {
      nextPageElement.addEventListener('click', () =>
        searchListings(API, { limit: 12, page: nextPage, search: search })
      );
    } else if (API === 'category') {
      nextPageElement.addEventListener('click', () =>
        searchListings(API, { limit: 12, page: nextPage, tag: tag })
      );
    }
  }
};
