import { CreateCategory } from '../../ui/global/components/createCategory';
import { MakeListing } from '../../ui/global/components/makeListing';

export const runSearchPage = async () => {
  const categoryContainer = document.getElementById('searchCategories');
  if (categoryContainer) CreateCategory(categoryContainer);
  const paginationDiv = document.getElementById('pagination') as HTMLDivElement;
  const searchListingDiv = document.getElementById(
    'searchListings'
  ) as HTMLDivElement;

  const form = document.getElementById('sortListings');

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const search = formData.get('searchBar') ?? '';
    console.log('hello from eventlistener:', search);
    MakeListing({
      API: 'search',
      limit: 12,
      page: 1,
      search: search,
      paginationDiv: paginationDiv,
      section: searchListingDiv,
    });
  });
};
