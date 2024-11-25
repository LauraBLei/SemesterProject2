import { readPosts } from '../../api/listing/read';
import { carousel } from '../../ui/global/carousel';
import { MakeHeader } from '../../ui/global/header';
import { MakeListing } from '../../utilities/components';

const runPage = async () => {
  MakeHeader();
  const section = document.getElementById('mostRecent') as HTMLDivElement;
  const paginationDiv = document.getElementById('pagination') as HTMLDivElement;

  const carouselPosts = await readPosts({
    limit: 10,
    page: 1,
    sort: 'endsAt',
    sortOrder: 'asc',
    active: true,
  });
  const mostRecent = await readPosts({
    limit: 12,
    sort: 'created',
    sortOrder: 'desc',
    active: true,
  });
  carousel(carouselPosts.data);
  MakeListing({
    paginationDiv: paginationDiv,
    section: section,
    posts: mostRecent,
    API: 'category',
    tag: '',
  });
};

runPage();
