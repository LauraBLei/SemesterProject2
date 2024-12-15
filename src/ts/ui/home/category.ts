import { MakeListing } from '../listing/makeListing';

export const onCategory = async (
  event: Event,
  paginationDiv: HTMLDivElement,
  searchListingDiv: HTMLDivElement
) => {
  const target = event.target as HTMLSelectElement;
  const selectedCategory = target.value;

  if (selectedCategory !== 'default') {
    await MakeListing({
      API: 'category',
      limit: 12,
      page: 1,
      tag: selectedCategory,
      paginationDiv: paginationDiv,
      section: searchListingDiv,
    });
  }
};
