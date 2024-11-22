import { categories } from './objects';
import { ElementHelper, listingObject } from './types';

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

export const CreateCategory = () => {
  const section = document.getElementById('categories');

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
    const category = CreateElement({ element: 'p', text: `${key.text}` });
    section?.appendChild(container);
    container.append(imageDiv, category);
    imageDiv.appendChild(image);
  });
};

export const MakeListing = (posts: listingObject[]) => {
  const section = document.getElementById('mostRecent');

  posts.forEach((post) => {
    const container = CreateElement({
      element: 'div',
      styling:
        'max-w-[410px] max-h-[650] w-full h- full bg-black p-6 rounded-md m-4 justify-between',
    });

    const imageDiv = CreateElement({ element: 'div' });
    if (post.media[0]) {
      const image = CreateElement({
        element: 'img',
        styling: 'w-[350px] h-[350px]',
        src: `${post.media[0].url}`,
        alt: `${post.media[0].alt}`,
      });
      imageDiv.append(image);
    } else {
      const image = CreateElement({
        element: 'img',
        styling: 'w-[350px] h-[350px]',
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
      styling: 'text-white border-y-2 border-white py-2 overflow-x-auto',
    });

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
  });
};
