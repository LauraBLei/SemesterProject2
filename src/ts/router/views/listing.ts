import { readListing } from '../../api/listing/read';
import { CreateElement } from '../../ui/global/components/createElement';
import { Icon } from '../../ui/global/components/makeIcon';
import {
  createCountdownHTML,
  isAuctionClosed,
} from '../../ui/global/components/countdown';
import { onBid } from '../../ui/listing/bid';
import { iconPaths } from '../../utilities/enums';
import { Bid, ListingObject, Media } from '../../utilities/types';

export const runListingPage = async () => {
  const id = JSON.parse(localStorage.getItem('id') ?? '{}');
  const form = document.getElementById('bidForm');
  const listing = await readListing(id);
  const userInfo = JSON.parse(localStorage.getItem('userInfo') ?? '{}');

  if (userInfo.name === listing?.seller.name) form?.classList.add('hidden');

  if (listing) {
    MakeImages(listing.media);
    MakeContent(listing);
    MakeBids(listing.bids);
    form?.addEventListener('submit', (event) => onBid(event, id, listing));
  }
};

const MakeImages = (images: Media[]) => {
  const mainImage = document.getElementById('mainImage') as HTMLImageElement;
  if (images[0]) mainImage.src = images[0].url;

  const otherImages = document.getElementById('otherImages');
  if (!images[1] && !images[2]) otherImages?.classList.add('hidden');

  const secondImage = document.getElementById('imageTwo') as HTMLImageElement;
  const secondImageContainer = document.getElementById(
    'secondImageContainer'
  ) as HTMLDivElement;
  if (!images[1]) secondImageContainer.classList.add('hidden');
  if (images[1]) secondImage.src = images[1].url;

  const thirdImage = document.getElementById('imageThree') as HTMLImageElement;
  const thirdImageContainer = document.getElementById(
    'thirdImageContainer'
  ) as HTMLDivElement;
  if (!images[2]) thirdImageContainer.classList.add('hidden');
  if (images[2]) thirdImage.src = images[2].url;
};

const MakeContent = (listing: ListingObject) => {
  const loggedIn = localStorage.getItem('token');
  const form = document.getElementById('bidForm');
  const auctionClosed = document.getElementById('auctionClosed');
  if (!loggedIn) form?.classList.add('hidden');
  const title = document.getElementById('listingTitle');
  if (listing.title && title) title.innerText = listing.title;

  if (isAuctionClosed(listing.endsAt)) {
    form?.classList.add('hidden');
    auctionClosed?.classList.remove('hidden');
  }

  const description = document.getElementById('description');
  if (listing.description && description)
    description.innerText = listing.description;

  const sellerAvatar = document.getElementById(
    'sellerAvatar'
  ) as HTMLImageElement;
  if (listing.seller.avatar && sellerAvatar)
    sellerAvatar.src = listing.seller.avatar.url;

  const sellerName = document.getElementById('sellerName');
  if (listing.seller.name && sellerName)
    sellerName.innerText = listing.seller.name;

  const lastBid = document.getElementById('lastBid') as HTMLParagraphElement;
  const bids = listing.bids.reverse();

  if (listing.bids[0] && lastBid) lastBid.innerText = `${bids[0].amount}`;

  const countDownContainer = document.getElementById('countDown');
  const countDown = createCountdownHTML(listing.endsAt);
  countDownContainer?.append(countDown);
};

const MakeBids = (bids: Bid[]) => {
  const bidContainer = document.getElementById('bids');

  if (bids.length === 0 && bidContainer) {
    bidContainer.innerText = 'There are currently no bids!';
    bidContainer.className =
      'text-lg text-brandBlack text-center font-lato font-semibold';
    return;
  }
  console.log(bids);

  bids.sort((a, b) => b.amount - a.amount);

  bids.forEach((bid) => {
    const container = CreateElement<HTMLDivElement>({
      element: 'div',
      styling:
        'bg-brandBlack dark:bg-brandGreen rounded-md max-w-[460px] min-w-[250px] w-full h-auto p-2 flex justify-between items-center ',
    });
    const userInfoDiv = CreateElement<HTMLDivElement>({
      element: 'div',
      styling: 'flex gap-4 items-center',
    });
    const imageDiv = CreateElement<HTMLDivElement>({
      element: 'div',
      styling:
        'rounded-full w-[40px] h-[40px] md:w-[70px] md:h-[70px]  overflow-hidden',
    });
    const image = CreateElement<HTMLImageElement>({
      element: 'img',
      src: `${bid.bidder.avatar.url}`,
      styling: 'w-full h-full object-cover',
    });
    const bidderName = CreateElement<HTMLParagraphElement>({
      element: 'p',
      text: `${bid.bidder.name}`,
      styling: 'text-brandWhite text-lg md:text-2xl ',
    });

    const bidValue = CreateElement<HTMLDivElement>({
      element: 'div',
      styling: 'text-brandWhite text-lg md:text-2xl flex gap-4 items-center',
    });
    bidValue.innerHTML = `${bid.amount} ${Icon(iconPaths.credits, '#E0B341')}`;

    bidContainer?.append(container);
    container.append(userInfoDiv, bidValue);
    userInfoDiv.append(imageDiv, bidderName);
    imageDiv.append(image);
  });
};
