import { iconPaths } from '../../../utilities/enums';
import { ListingObject } from '../../../utilities/types';
import { CreateElement } from '../components/createElement';
import { Icon } from '../components/makeIcon';
import { createCountdownHTML } from '../components/countdown';

export const makeSingleListing = (
  post: ListingObject,
  section: HTMLDivElement
) => {
  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '*No text found*';
    if (text.length === 0) return '*No text found*';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };
  const croppedTitle = truncateText(post.title, 15);
  const croppedDescription = truncateText(post.description, 50);

  const container = CreateElement<HTMLDivElement>({
    element: 'div',
    styling:
      'w-full max-w-[400px] md:max-w-[350px]  h-auto bg-brandBlack dark:bg-brandGreen shadow-sm shadow-brandBlack p-3 rounded-md flex flex-col justify-evenly',
  });

  const imageDiv = CreateElement<HTMLDivElement>({
    element: 'div',
    styling:
      'w-full h-[200px] flex items-center justify-center rounded-md overflow-hidden  bg-[url("/placeholder.jpg")] bg-cover bg-center',
  });
  if (post.media[0]) {
    const image = CreateElement<HTMLImageElement>({
      element: 'img',
      styling: 'w-full h-full object-cover',
      src: `${post.media[0].url}`,
      alt: post.media[0].alt ? post.media[0].alt : post.title,
    });
    imageDiv.append(image);
  } else {
    const image = CreateElement<HTMLImageElement>({
      element: 'img',
      styling: 'w-full h-full object-cover',
      src: `/placeholder.jpg`,
      alt: `Image not found`,
    });
    imageDiv.append(image);
  }

  const title = CreateElement<HTMLHeadingElement>({
    element: 'h2',
    styling:
      'text-white font-playfairDisplay font-semibold  text-center text-lg md:text-2xl py-2',
    text: croppedTitle,
  });

  const description = CreateElement<HTMLParagraphElement>({
    element: 'p',
    text: croppedDescription,
    styling:
      'text-white border-y-2 border-white font-lato text-sm md:text-lg py-2 overflow-x-auto max-h-[100px]  py-4 overflow-hidden ',
  });

  const countDown = createCountdownHTML(post.endsAt);
  countDown.className = 'text-2xl text-center py-2 text-brandWhite';

  const userInfoDiv = CreateElement<HTMLDivElement>({
    element: 'div',
    styling: 'flex gap-5 items-center py-4',
  });

  const profileImageDiv = CreateElement<HTMLDivElement>({
    element: 'div',
    styling: 'h-[40px] w-[40px] overflow-hidden rounded-full',
  });

  const profileImage = CreateElement<HTMLImageElement>({
    element: 'img',
    styling: 'object-cover w-full h-full',
    src: `${post.seller.avatar.url}`,
  });

  const username = CreateElement<HTMLParagraphElement>({
    element: 'p',
    styling: 'text-lg lg:text-2xl text-white font-lato',
    text: `${post.seller.name}`,
  });

  const seePost = CreateElement<HTMLAnchorElement>({
    element: 'a',
    href: '/listing/',
    styling:
      'scale-90 border-2 border-brandGreen dark:border-brandYellow rounded-md hover:scale-100 dark:hover:bg-brandBlack dark:hover:border-brandBlack transition ease-in-out duration-300 transform cursor-pointer p-2 hover:bg-brandGreen w-full flex justify-center text-white text-2xl items-end gap-3',
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
