import { makeBid } from '../../api/listing/bid';
import { ListingObject } from '../../utilities/types';

export const onBid = (
  event: SubmitEvent,
  id: string,
  listing: ListingObject
) => {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const bidError = document.getElementById('wrongBid');
  const credits = JSON.parse(localStorage.getItem('credits') ?? '');
  const formData = new FormData(form);
  const numberInput = formData.get('bid');
  const amount = Number(numberInput);

  if (credits < amount) {
    document.getElementById('noCredits')?.classList.remove('hidden');
  }
  if (isNaN(amount)) {
    alert(`Invalid number ${amount}`);
    return;
  }

  if (listing.bids[0]) {
    if (listing.bids[0].amount >= amount) {
      bidError?.classList.remove('hidden');
      return;
    }
  }
  makeBid(id, amount);
};
