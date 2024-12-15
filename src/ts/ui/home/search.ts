import { MakeListing } from '../listing/makeListing';

export const onSearch = async (
  event: SubmitEvent,
  paginationDiv: HTMLDivElement,
  section: HTMLDivElement
) => {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  const search = formData.get('searchBar') ?? '';

  if (search === '') {
    await MakeListing({
      paginationDiv: paginationDiv,
      section: section,
      API: 'category',
      tag: '',
      limit: 12,
      page: 1,
      sort: 'created',
    });
  } else {
    await MakeListing({
      API: 'search',
      limit: 12,
      page: 1,
      search: search,
      paginationDiv: paginationDiv,
      section: section,
    });
  }
};
