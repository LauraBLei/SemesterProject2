import { readListing } from '../../api/listing/read';
import { ListingObject } from '../../utilities/types';

const runPage = async () => {
  const id = JSON.parse(localStorage.getItem('id') ?? '');
  const listing = await readListing(id);
  console.log('current listing:', listing);

  if (listing) MakeHTML(listing);
};

const MakeHTML = (listing: ListingObject) => {};

runPage();
