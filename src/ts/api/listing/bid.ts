import { confirmText } from '../../ui/global/components/confirm';
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

    if (response.ok) {
      confirmText('confirmBid', '/listing/');
    }
  } catch (error) {}
};
