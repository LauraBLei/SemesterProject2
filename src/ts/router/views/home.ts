import { readPosts } from '../../api/listing/read';
import { MakeListing } from '../../ui/listing/makeListing';
import { carousel } from '../../ui/global/components/carousel';
export const runPage = async () => {
  const section = document.getElementById('mostRecent') as HTMLDivElement;
  const paginationDiv = document.getElementById('pagination') as HTMLDivElement;

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
