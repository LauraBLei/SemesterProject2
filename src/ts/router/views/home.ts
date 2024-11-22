import { readPosts } from '../../api/listing/read';
import { carousel } from '../../ui/global/carousel';
import { MakeHeader } from '../../ui/global/header';
import { authGuard } from '../../utilities/authGuard';
import { CreateCategory, MakeListing } from '../../utilities/components';

const runPage = async () => {
  MakeHeader();
  authGuard();

  const carouselPosts = await readPosts({
    limit: 10,
    page: 1,
    sort: 'endsAt',
    sortOrder: 'asc',
    active: true,
  });
  const mostRecent = await readPosts({
    limit: 12,
    sort: 'endsAt',
    sortOrder: 'desc',
    active: true,
  });
  console.log('posts:', mostRecent);

  carousel(carouselPosts);
  CreateCategory();
  MakeListing(mostRecent);
};

runPage();
