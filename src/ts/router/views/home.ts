import { readPosts } from '../../api/listing/read';
import { carousel } from '../../ui/global/carousel';
import { MakeHeader } from '../../ui/global/header';
import { authGuard } from '../../utilities/authGuard';

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
  console.log('posts:', carouselPosts);
  carousel(carouselPosts);
};

runPage();
