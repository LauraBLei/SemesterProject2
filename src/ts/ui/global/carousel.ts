import { CreateElement } from '../../utilities/components';
import { listingObject } from '../../utilities/types';

export const carousel = (posts: listingObject[]) => {
  const prevBtn = document.querySelector('div.prev-arrow')!;
  const nextBtn = document.querySelector('div.next-arrow')!;
  const sectionContainer = document.querySelector<HTMLDivElement>(
    'div.carousel-sections'
  )!;
  const dotContainer =
    document.querySelector<HTMLDivElement>('div.dot-section')!;

  let currentIndex: number = 0;
  let slides: listingObject[] = posts;

  posts.forEach((post) => makeImage(post, sectionContainer, dotContainer));

  const dots = document.querySelectorAll('.dot');

  const updateCarousel = () => {
    // Hide all images
    const allImages = sectionContainer?.querySelectorAll('div');
    allImages?.forEach((image, index) => {
      if (index === currentIndex) {
        image.classList.remove('hidden');
      } else {
        image.classList.add('hidden');
      }
    });
    dots.forEach((dot, dotPosition) => {
      if (currentIndex === dotPosition) {
        dot.classList.add('active');
        dot.classList.remove('idle');
      } else {
        dot.classList.remove('active');
        dot.classList.add('idle');
      }
    });
  };

  prevBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  nextBtn?.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  });

  updateCarousel();

  dots.forEach((dot, dotPosition) => {
    dot.addEventListener('click', () => {
      currentIndex = dotPosition;
      updateCarousel();
    });
  });
};

const makeImage = (
  post: listingObject,
  sectionContainer: Element,
  dotContainer: Element
) => {
  const imageContainer = CreateElement({
    element: 'div',
    styling:
      'flex items-center justify-center w-full h-full overflow-hidden object-cover min-h-[400px]',
  });
  if (post.media[0]) {
    imageContainer.innerHTML = `
                    <img class="object-cover w-full h-full" src="${post.media[0].url}" alt="Carousel Image">
        `;
  } else {
    imageContainer.innerHTML = `

        <img src='/placeholder.jpg' alt='Image not found' class="object-cover w-full h-full"></img>

        `;
  }
  const dot = CreateElement({
    element: 'div',
    styling: 'dot',
  });

  sectionContainer?.append(imageContainer);
  dotContainer?.append(dot);
};
