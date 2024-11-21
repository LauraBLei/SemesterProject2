import { CreateElement } from '../../utilities/components';
import { listingObject } from '../../utilities/types';

export const carousel = (posts: listingObject[]) => {
  const prevBtn = document.querySelector('div.prev-arrow')!;
  const nextBtn = document.querySelector('div.next-arrow')!;
  const sectionContainer = document.querySelector<HTMLDivElement>(
    'div.carousel-sections'
  )!;

  if (!sectionContainer || !prevBtn || !nextBtn) return;
  let currentIndex: number = 0;
  let slides: listingObject[] = posts;

  posts.forEach((post) => makeImage(post, sectionContainer));

  prevBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel(sectionContainer, currentIndex);
  });

  nextBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel(sectionContainer, currentIndex);
  });

  updateCarousel(sectionContainer, currentIndex);
};

const makeImage = (post: listingObject, sectionContainer: Element) => {
  const imageContainer = CreateElement({
    element: 'div',
    styling: 'flex items-center justify-center w-full h-full  overflow-hidden',
  });
  if (post.media[0]) {
    imageContainer.innerHTML = `
                    <img class="object-cover w-full" src="${post.media[0].url}" alt="Carousel Image">
        `;
  } else {
    imageContainer.innerHTML = `

        <p class="headline text-white ">Image not found</p>

        `;
  }

  sectionContainer?.append(imageContainer);
};

const updateCarousel = (sectionContainer: Element, currentIndex: number) => {
  // Hide all images
  const allImages = sectionContainer?.querySelectorAll('div');
  allImages?.forEach((image, index) => {
    if (index === currentIndex) {
      image.classList.remove('hidden');
    } else {
      image.classList.add('hidden');
    }
  });
};
