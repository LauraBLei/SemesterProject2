import { readListing } from '../../api/listing/read';
import { createCountdownHTML } from '../../ui/global/countdown';
import { onBid } from '../../ui/listing/bid';
import { CreateElement, Icon } from '../../utilities/components';
import { iconPaths } from '../../utilities/enums';
import { Bid, ListingObject, Media } from '../../utilities/types';

const runPage = async () => {
  const id = JSON.parse(localStorage.getItem('id') ?? '');
  const form = document.getElementById('bidForm');
  const listing = await readListing(id);
  console.log(listing?.bids);

  if (listing) MakeImages(listing.media);
  if (listing) MakeContent(listing);
  if (listing) MakeBids(listing.bids);
  form?.addEventListener('submit', (event) => onBid(event, id));
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
  const title = document.getElementById('listingTitle');
  if (listing.title && title) title.innerText = listing.title;

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
  console.log(bids);

  const bidContainer = document.getElementById('bids');
  console.log('length', bids.length);

  if (bids.length === 0 && bidContainer) {
    bidContainer.innerText = 'There are currently no bids!';
    return;
  }

  bids.forEach((bid) => {
    const container = CreateElement({
      element: 'div',
      styling:
        'bg-black rounded-md max-w-[460px] w-full h-auto p-2 flex justify-between items-center ',
    });
    const userInfoDiv = CreateElement({
      element: 'div',
      styling: 'flex gap-4 items-center',
    });
    const imageDiv = CreateElement({
      element: 'div',
      styling: 'rounded-full max-w-[70px] w-full h-full overflow-hidden',
    });
    const image = CreateElement({
      element: 'img',
      src: `${bid.bidder.avatar.url}`,
      styling: 'w-full h-full object-cover',
    });
    const bidderName = CreateElement({
      element: 'p',
      text: `${bid.bidder.name}`,
      styling: 'text-white text-2xl ',
    });

    const bidValue = CreateElement({
      element: 'div',
      styling: 'text-white text-2xl flex gap-4 items-end',
    });
    bidValue.innerHTML = `${bid.amount} ${Icon(iconPaths.credits)}`;

    bidContainer?.append(container);
    container.append(userInfoDiv, bidValue);
    userInfoDiv.append(imageDiv, bidderName);
    imageDiv.append(image);
  });
};

runPage();
