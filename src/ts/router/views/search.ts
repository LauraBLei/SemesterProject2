import { MakeHeader } from '../../ui/global/header';
import { searchListings } from '../../ui/listing/sortedListings';
import { CreateCategory } from '../../utilities/components';

const runPage = async () => {
  MakeHeader();
  const categoryContainer = document.getElementById('searchCategories');
  if (categoryContainer) CreateCategory(categoryContainer);

  const form = document.getElementById('sortListings');

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const search = formData.get('searchBar') ?? '';
    console.log('hello from eventlistener:', search);
    searchListings('search', { limit: 12, page: 1, search: search });
  });
};

runPage();
