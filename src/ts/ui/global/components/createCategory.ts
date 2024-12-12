import { categories } from '../../../utilities/objects';
import { CreateElement } from './createElement';
import { MakeListing } from './makeListing';

export const CreateCategory = (section: HTMLElement) => {
  const paginationDiv = document.getElementById('pagination') as HTMLDivElement;
  const searchListingDiv = document.getElementById(
    'searchListings'
  ) as HTMLDivElement;
  categories.forEach((key) => {
    const container = CreateElement<HTMLDivElement>({
      element: 'div',
      styling:
        'flex flex-col cursor-pointer items-center scale-90 hover:scale-100 transition-transform duration-300 ease-in-out transform',
    });
    const imageDiv = CreateElement<HTMLDivElement>({
      element: 'div',
      styling:
        'rounded-full h-[100px] w-[100px] md:h-[162px] md:w-[162px] overflow-hidden',
    });
    const image = CreateElement<HTMLImageElement>({
      element: 'img',
      src: `${key.src}`,
      alt: `${key.text}`,
      styling: 'object-cover h-full w-full',
    });

    container.addEventListener('click', async () => {
      await MakeListing({
        API: 'category',
        limit: 12,
        page: 1,
        tag: key.tag,
        paginationDiv: paginationDiv,
        section: searchListingDiv,
      });
    });

    const category = CreateElement<HTMLParagraphElement>({
      element: 'p',
      text: `${key.text}`,
      styling: 'font-lato text-lg text-brandBlack dark:text-brandWhite',
    });
    section?.appendChild(container);
    container.append(imageDiv, category);
    imageDiv.appendChild(image);
  });
};
