import { MakeCreateOrEditForm } from '../../../router/views/listingCreateEdit';
import { iconPaths } from '../../../utilities/enums';
import { ListingObject } from '../../../utilities/types';
import { onDeletePost } from '../../listing/delete';
import { CreateElement } from '../components/createElement';
import { Icon } from '../components/makeIcon';
import { createCountdownHTML, isAuctionClosed } from '../components/countdown';

export const MakeListings = (
  listing: ListingObject,
  listingsContainer: HTMLDivElement,
  section: string
) => {
  if (section === 'closed') {
    if (!isAuctionClosed(listing.endsAt)) {
      return;
    }
  }
  if (section === 'created') {
    if (isAuctionClosed(listing.endsAt)) {
      return;
    }
  }
  const container = CreateElement<HTMLDivElement>({
    element: 'div',
    id: listing.id,
    styling:
      'bg-brandBlack dark:bg-brandGreen rounded-md text-brandWhite text-lg text-nowrap p-2 w-full max-w-[400px] flex flex-col items-center gap-4 shadow-sm shadow-brandBlack',
  });

  const imageDiv = CreateElement<HTMLDivElement>({
    element: 'div',
    styling: 'h-[200px] w-full',
  });
  const image = CreateElement<HTMLImageElement>({
    element: 'img',
    styling: 'w-full h-full object-cover',
    src: listing.media[0].url,
    alt: listing.media[0].alt ? listing.media[0].alt : listing.title,
  });
  const title = CreateElement<HTMLParagraphElement>({
    element: 'p',
    text: listing.title,
    styling: 'font-playfairDisplay font-semibold text-lg tracking-[8px]',
  });

  const countDown = createCountdownHTML(listing.endsAt);
  countDown.className =
    'font-playfairDisplay font-semibold text-lg tracking-widest';

  const buttonContainer = CreateElement<HTMLButtonElement>({
    element: 'div',
    styling: 'w-full flex justify-evenly',
  });

  if (section === 'created') {
    const editButton = CreateElement<HTMLButtonElement>({
      element: 'button',
      styling:
        'scale-75 hover:scale-100 transition ease-in-out duration-300 transform cursor-pointer  ',
    });
    editButton.innerHTML = `${Icon(iconPaths.edit, '#E0B341')}`;
    editButton.addEventListener('click', () => {
      const div = document.getElementById('createEditContainer');
      div?.classList.remove('hidden');
      MakeCreateOrEditForm({ id: listing.id, edit: true });
    });
    buttonContainer.append(editButton);
  }

  if (section === 'created' || section === 'closed') {
    const deleteButton = CreateElement<HTMLButtonElement>({
      element: 'button',
      styling:
        'scale-75 hover:scale-100 transition ease-in-out duration-300 transform cursor-pointer  ',
    });
    deleteButton.innerHTML = `${Icon(iconPaths.delete, '#E0B341')}`;
    deleteButton.addEventListener('click', () => {
      onDeletePost(listing.id);
    });
    buttonContainer.append(deleteButton);
  }

  const seePost = CreateElement<HTMLAnchorElement>({
    element: 'a',
    href: '/listing/',
    styling:
      'scale-75 hover:scale-100 transition ease-in-out duration-300 transform cursor-pointer ',
  });
  seePost.addEventListener('click', () => {
    localStorage.setItem('id', JSON.stringify(listing.id));
  });
  seePost.innerHTML = `${Icon(iconPaths.eye, '#E0B341')}`;

  container.append(imageDiv, title, countDown, buttonContainer);
  imageDiv.append(image);
  buttonContainer.append(seePost);
  listingsContainer.append(container);
};

export const MakeUserBids = (
  listing: { listing: ListingObject; amount: number },
  listingsContainer: HTMLDivElement
) => {
  if (isAuctionClosed(listing.listing.endsAt)) {
    return;
  }
  const container = CreateElement<HTMLDivElement>({
    element: 'div',
    id: listing.listing.id,
    styling:
      'bg-brandBlack dark:bg-brandGreen rounded-md text-brandWhite text-lg text-nowrap p-2 w-full max-w-[400px] flex flex-col items-center gap-4 shadow-sm shadow-brandBlack',
  });
  const imageDiv = CreateElement<HTMLDivElement>({
    element: 'div',
    styling: 'h-[200px] w-full',
  });
  const image = CreateElement<HTMLImageElement>({
    element: 'img',
    styling: 'w-full h-full object-cover',
    src: listing.listing.media[0].url,
    alt: listing.listing.media[0].alt
      ? listing.listing.media[0].alt
      : listing.listing.title,
  });
  const title = CreateElement<HTMLParagraphElement>({
    element: 'p',
    text: listing.listing.title,
    styling:
      'font-playfairDisplay font-semibold text-lg tracking-[8px] text-wrap text-center',
  });

  const bid = CreateElement<HTMLParagraphElement>({
    element: 'p',
    text: `Bid: ${listing.amount}`,
    styling: 'font-lato font-semibold text-lg text-brandYellow tracking-[8px]',
  });

  const countDown = createCountdownHTML(listing.listing.endsAt);
  countDown.className =
    'font-playfairDisplay font-semibold text-lg tracking-[8px]';

  const seePost = CreateElement<HTMLAnchorElement>({
    element: 'a',
    href: '/listing/',
    styling:
      'scale-75 hover:scale-100 transition ease-in-out duration-300 transform cursor-pointer p-2 ',
  });
  seePost.addEventListener('click', () => {
    localStorage.setItem('id', JSON.stringify(listing.listing.id));
  });
  seePost.innerHTML = `${Icon(iconPaths.eye, '#E0B341')}`;

  container.append(imageDiv, title, bid, countDown, seePost);
  imageDiv.append(image);
  listingsContainer.append(container);
};
