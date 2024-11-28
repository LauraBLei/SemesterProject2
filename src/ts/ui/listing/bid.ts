import { makeBid } from '../../api/listing/bid';

export const onBid = (event: SubmitEvent, id: string) => {
  event.preventDefault();
  const form = event.target as HTMLFormElement;

  const formData = new FormData(form);
  const numberInput = formData.get('bid');
  const amount = Number(numberInput);

  if (isNaN(amount)) {
    alert(`Invalid number ${amount}`);
    return;
  }

  console.log(`bidding this amount: ${amount} on this id: `, id);

  makeBid(id, amount);
};
