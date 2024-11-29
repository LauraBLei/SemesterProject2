import { readPosts } from '../../api/listing/read';
import { carousel } from '../../ui/global/carousel';
import { MakeListing } from '../../ui/global/components/makeListing';

const runPage = async () => {
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
  MakeListing({
    paginationDiv: paginationDiv,
    section: section,
    API: 'category',
    tag: '',
    limit: 12,
    page: 1,
    sort: 'created',
  });
};

runPage();
