import { categories } from '../../../utilities/objects';
import { CreateElement } from './createElement';
import { MakeListing } from './makeListing';

export const CreateCategory = (section: HTMLElement) => {
  const paginationDiv = document.getElementById('pagination') as HTMLDivElement;
  const searchListingDiv = document.getElementById(
    'searchListings'
  ) as HTMLDivElement;
  categories.forEach((key) => {
    const container = CreateElement({
      element: 'a',
      styling:
        'flex flex-col items-center scale-90 hover:scale-100 transition-transform duration-300 ease-in-out transform',
    });
    const imageDiv = CreateElement({
      element: 'div',
      styling:
        'rounded-full h-[100px] w-[100px] md:h-[162px] md:w-[162px] overflow-hidden',
    });
    const image = CreateElement({
      element: 'img',
      src: `${key.src}`,
      alt: `${key.text}`,
      styling: 'object-cover h-full w-full',
    });

    container.addEventListener('click', () => {
      console.log('tag: ', key.tag);

      MakeListing({
        API: 'category',
        limit: 12,
        page: 1,
        tag: key.tag,
        paginationDiv: paginationDiv,
        section: searchListingDiv,
      });
    });

    const category = CreateElement({ element: 'p', text: `${key.text}` });
    section?.appendChild(container);
    container.append(imageDiv, category);
    imageDiv.appendChild(image);
  });
};
