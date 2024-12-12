import { ListingObject } from '../../../utilities/types';
import { CreateElement } from './createElement';

export const carousel = (posts: ListingObject[]) => {
  const prevBtn = document.querySelector('div.prev-arrow')!;
  const nextBtn = document.querySelector('div.next-arrow')!;
  const sectionContainer = document.querySelector<HTMLDivElement>(
    'div.carousel-sections'
  )!;
  const dotContainer =
    document.querySelector<HTMLDivElement>('div.dot-section')!;

  let currentIndex: number = 0;
  let slides: ListingObject[] = posts;

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
        dot.classList.toggle('active');
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
  post: ListingObject,
  sectionContainer: Element,
  dotContainer: Element
) => {
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };
  const imageContainer = CreateElement<HTMLDivElement>({
    element: 'div',
    styling:
      'flex items-center justify-center w-full h-full overflow-hidden object-cover h-full',
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
  const dot = CreateElement<HTMLDivElement>({
    element: 'div',
    styling: 'dot',
  });

  const croppedTitle = truncateText(post.title, 20);
  const title = CreateElement<HTMLParagraphElement>({
    element: 'p',
    text: croppedTitle,
    styling:
      'text-xl md:text-3xl w-full h-full absolute bg-brandBlack/50 text-white font-bold font-playfairDisplay flex items-center justify-center tracking-[8px] md:tracking-[10px]',
  });

  sectionContainer?.append(imageContainer);
  imageContainer.append(title);
  dotContainer?.append(dot);
  imageContainer.addEventListener('click', () => {
    localStorage.setItem('id', JSON.stringify(post.id));
    window.location.href = '/listing/';
  });
};
