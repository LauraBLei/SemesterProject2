import { API } from '../APIEndPoints';
import { headers } from '../headers';

export const makeBid = async (id: string, bid: number) => {
  const body = {
    amount: bid,
  };

  try {
    const response = await fetch(API.AUCTION_LISTINGS + '/' + id + '/bids', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(body),
    });
    console.log(response);

    if (response.ok) {
      alert(`you added a bid of ${bid} credits!`);
      window.location.href = '/listing/';
    } else {
      alert('something went wrong ');
    }
  } catch (error) {
    alert('Something went wrong trying to bid!');
  }
};
