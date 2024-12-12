import { MakePaginationType } from '../../../utilities/types';
import { CreateElement } from './createElement';
import { MakeListing } from './makeListing';

export const makePagination = ({
  meta,
  container,
  API,
  tag,
  search,
  paginationDiv,
}: MakePaginationType) => {
  const currentPage = meta.currentPage;
  const nextPage = meta.nextPage;
  const previousPage = meta.previousPage;
  const lastPage = meta.pageCount;
  paginationDiv.innerHTML = '';

  const pageChoiceContainer = CreateElement<HTMLDivElement>({
    element: 'div',
    styling: 'flex gap-4',
  });

  const firstPage = CreateElement<HTMLParagraphElement>({
    element: 'p',
    id: 'firstPage',
    text: 'First page',
    styling:
      'text-sm md:text-2xl text-brandBlack dark:text-brandWhite font-playfairDisplay font-semibold cursor-pointer scale-75 hover:scale-100  transition-transform duration-300 ease-in-out transform',
  });
  paginationDiv.append(firstPage);
  firstPage.addEventListener(
    'click',
    async () =>
      await MakeListing({
        limit: 12,
        page: 1,
        search: search,
        tag: tag,
        paginationDiv: paginationDiv,
        section: container,
        API: API,
      })
  );
  paginationDiv.append(pageChoiceContainer);
  if (meta.isFirstPage === false) {
    const previousPageElement = CreateElement<HTMLParagraphElement>({
      element: 'p',
      id: 'prev',
      text: `${previousPage}`,
      styling:
        'text-lg md:text-2xl text-brandBlack dark:text-brandWhite font-playfairDisplay font-semibold cursor-pointer scale-75 hover:scale-100  transition-transform duration-300 ease-in-out transform',
    });
    pageChoiceContainer.append(previousPageElement);

    previousPageElement.addEventListener('click', () =>
      MakeListing({
        limit: 12,
        page: previousPage,
        search: search,
        tag: tag,
        paginationDiv: paginationDiv,
        section: container,
        API: API,
      })
    );
  }

  const currentPageElement = CreateElement<HTMLParagraphElement>({
    element: 'p',
    id: 'current',
    text: `${currentPage}`,
    styling:
      'font-bold text-brandBlack dark:text-brandWhite font-playfairDisplay text-2xl md:text-3xl',
  });
  pageChoiceContainer.append(currentPageElement);

  const lastPageNumber = CreateElement<HTMLParagraphElement>({
    element: 'p',
    text: `Last page`,
    styling:
      'text-sm md:text-2xl text-brandBlack dark:text-brandWhite font-playfairDisplay font-semibold cursor-pointer scale-75 hover:scale-100  transition-transform duration-300 ease-in-out transform',
  });
  paginationDiv.append(lastPageNumber);
  lastPageNumber.addEventListener(
    'click',
    async () =>
      await MakeListing({
        limit: 12,
        page: lastPage,
        search: search,
        tag: tag,
        paginationDiv: paginationDiv,
        section: container,
        API: API,
      })
  );
  if (meta.isLastPage === false) {
    const nextPageElement = CreateElement<HTMLParagraphElement>({
      element: 'p',
      id: 'next',
      text: `${nextPage}`,
      styling:
        'text-lg md:text-2xl text-brandBlack dark:text-brandWhite font-playfairDisplay font-semibold cursor-pointer scale-75 hover:scale-100  transition-transform duration-300 ease-in-out transform',
    });
    pageChoiceContainer.append(nextPageElement);

    nextPageElement.addEventListener(
      'click',
      async () =>
        await MakeListing({
          limit: 12,
          page: nextPage,
          search: search,
          tag: tag,
          paginationDiv: paginationDiv,
          section: container,
          API: API,
        })
    );
  }
};
