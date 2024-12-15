import { readPosts } from '../../api/listing/read';
import { MakeListing } from '../../ui/listing/makeListing';
import { carousel } from '../../ui/global/components/carousel';
import { isLoggedIn, userInfo } from '../../utilities/userInfo';
import { onSearch } from '../../ui/home/search';
import { onCategory } from '../../ui/home/category';
export const runPage = async () => {
  const section = document.getElementById('homePageListings') as HTMLDivElement;
  const paginationDiv = document.getElementById('pagination') as HTMLDivElement;
  if (isLoggedIn()) {
    const welcomeText = document.getElementById('welcomeText');
    if (welcomeText) welcomeText.innerHTML = `Welcome ${userInfo().name}!`;
  }
  const searchForm = document.getElementById('searchListings');
  const categoryForm = document.getElementById('categorySort');

  searchForm?.addEventListener('submit', async (event) =>
    onSearch(event, paginationDiv, section)
  );

  categoryForm?.addEventListener('change', (event) =>
    onCategory(event, paginationDiv, section)
  );

  const carouselPosts = await readPosts({
    limit: 10,
    page: 1,
    sort: 'endsAt',
    sortOrder: 'asc',
    active: true,
  });
  carousel(carouselPosts.data);
  await MakeListing({
    paginationDiv: paginationDiv,
    section: section,
    API: 'category',
    tag: '',
    limit: 12,
    page: 1,
    sort: 'created',
  });
};
