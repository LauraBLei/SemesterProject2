import { readListing } from '../../api/listing/read';
import { onEdit } from '../../ui/listing/update';
import { onCreate } from '../../ui/listing/create';
import { CreateElement } from '../../ui/global/components/createElement';
import { ListingObject } from '../../utilities/types';

export const createAndEditContainer = () => {
  const main = document.querySelector('main');
  const div = CreateElement<HTMLDivElement>({
    element: 'div',
    id: 'createEditContainer',
    styling:
      'bg-brandBlack/50  w-full h-full absolute hidden flex justify-center z-50',
  });

  main?.append(div);
};

export const MakeCreateOrEditForm = async ({
  id,
  create = false,
  edit = false,
}: {
  id?: string;
  create?: boolean;
  edit?: boolean;
}) => {
  const container = document.getElementById(
    'createEditContainer'
  ) as HTMLDivElement;
  let listing: ListingObject | undefined;
  if (edit && id) {
    listing = await readListing(id);
  }

  const outerDiv = CreateElement<HTMLDivElement>({
    element: 'div',
    styling:
      'border-2 md:border-4 border-brandGreen rounded-md w-[250px] md:w-[400px] lg:w-[600px] h-fit p-6 bg-brandWhite dark:bg-brandBlack mt-6 overflow-y-auto ',
  });

  const exitDiv = CreateElement<HTMLDivElement>({
    element: 'div',
    styling: 'flex justify-self-end',
  });

  const exitButton = CreateElement<HTMLButtonElement>({
    element: 'button',
    styling:
      'font-playfairDisplay text-lg md:text-2xl text-brandBlack dark:text-brandYellow border-black rounded-full scale-75 hover:scale-100 transition ease-in-out duration-300',
    id: 'exitButton',
    text: 'X',
  });

  const headline = CreateElement<HTMLHeadingElement>({
    element: 'h1',
    styling:
      'font-playfairDisplay text-brandBlack dark:text-brandWhite text-center border-b-2 border-brandBlack dark:border-brandYellow text-lg md:text-3xl p-2',
  });
  headline.innerText = create
    ? 'Create A Listing'
    : edit
      ? 'Edit A Listing'
      : '';

  const form = CreateElement<HTMLFormElement>({
    element: 'form',
    styling: 'flex flex-col items-center w-full',
  });
  form.id = create ? 'create' : edit ? 'edit' : '';

  const sectionOne = CreateElement<HTMLDivElement>({
    element: 'div',
    styling: 'flex flex-col items-center py-3 gap-6 mt-4 w-full',
  });

  const titleInput = CreateElement<HTMLInputElement>({
    element: 'input',
    id: 'title',
    styling: 'font-lato formInput w-full',
    type: 'text',
    name: 'title',
    placeholder: 'Title...',
    value: edit && listing ? listing.title : '',
    required: true,
  });

  const description = CreateElement<HTMLTextAreaElement>({
    element: 'textarea',
    id: 'description',
    styling: 'font-lato formInput min-h-[100px] w-full',
    name: 'description',
    placeholder: 'Add a description...',
    value: edit && listing ? listing.description : '',
    required: true,
    maxLength: 300,
  });

  const sectionTwo = CreateElement<HTMLDivElement>({
    element: 'div',
    styling: 'flex flex-wrap justify-evenly w-full items-center',
  });
  const select = CreateElement<HTMLSelectElement>({
    element: 'select',
    styling:
      'formInput font-lato h-[40px] text-center list-none appearance-none cursor-pointer hover:bg-brandBlack hover:text-brandYellow',
    name: 'category',
    required: true,
  });

  const defaultOption = CreateElement<HTMLOptionElement>({
    element: 'option',
    text: 'Category',
    value: '',
  });
  defaultOption.disabled;
  defaultOption.selected;

  const fineArt = CreateElement<HTMLOptionElement>({
    element: 'option',
    text: 'Fine Art',
    value: 'fine_art',
  });

  const collectables = CreateElement<HTMLOptionElement>({
    element: 'option',
    text: 'Collectables',
    value: 'collectables',
  });

  const watchesAndJewelry = CreateElement<HTMLOptionElement>({
    element: 'option',
    text: 'Watches and Jewelry',
    value: 'watches_jewelry',
  });

  const decorativeArt = CreateElement<HTMLOptionElement>({
    element: 'option',
    text: 'Decorative Art',
    value: 'decorative_art',
  });

  const classicCars = CreateElement<HTMLOptionElement>({
    element: 'option',
    text: 'Classic Cars',
    value: 'classic_cars',
  });

  const furniture = CreateElement<HTMLOptionElement>({
    element: 'option',
    text: 'Furniture',
    value: 'furniture',
  });

  const dateInput = CreateElement<HTMLInputElement>({
    element: 'input',
    id: 'auctionDate',
    styling:
      'border-brandGreen border-2 cursor-pointer appearance-none px-4 py-2 rounded-md bg-brandWhite dark:bg-brandGreen text-brandWhite',
    type: 'date',
    name: 'auctionDate',
    required: true,
  });
  if (edit && listing) {
    const formattedDate = new Date(listing.endsAt).toISOString().split('T')[0];
    dateInput.value = formattedDate || '';
  }

  const sectionThree = CreateElement<HTMLDivElement>({
    element: 'div',
    styling: 'flex flex-col items-center w-full',
  });
  const imageText = CreateElement<HTMLHeadingElement>({
    element: 'h2',
    text: 'Images:',
    styling:
      'font-playfairDisplay text-brandBlack text-lg lg:text-2xl place-self-start mt-4 mb-2',
  });
  const divImageInput = CreateElement<HTMLDivElement>({
    element: 'div',
    id: 'imageInput',
    styling: 'w-full flex flex-col gap-4 items-center',
  });
  const imageInput = CreateElement<HTMLInputElement>({
    element: 'input',
    styling: 'w-full formInput',
    type: 'url',
    name: 'url',
    placeholder: 'Add Image Url...',
    required: true,
  });

  const additionalImageInputs = CreateElement<HTMLDivElement>({
    element: 'div',
    id: 'additionalInputs',
    styling: 'w-full flex flex-col gap-4',
  });
  if (edit && listing) {
    if (listing.media && listing.media.length > 0) {
      imageInput.value = listing.media[0].url || ''; // Populate the first image input
      // Optionally, dynamically add additional image inputs for other URLs
      listing.media.slice(1).forEach((mediaItem) => {
        const additionalInput = CreateElement<HTMLInputElement>({
          element: 'input',
          styling: 'w-full border-2 border-black p-2',
          type: 'url',
          name: 'url',
          value: mediaItem.url || '',
        });

        additionalImageInputs.appendChild(additionalInput);
      });
    }
  }
  const addImageInputButton = CreateElement<HTMLButtonElement>({
    element: 'button',
    id: 'addImageInput',
    text: '+',
    type: 'button',
    styling:
      'rounded-full px-4 py-2 font-playfairDisplay font-semibold border-2 border-brandGreen dark:border-brandYellow text-brandGreen dark:text-brandYellow text-xl md:text-3xl   scale-95 hover:scale-100 hover:bg-brandBlack hover:text-brandYellow dark:hover:bg-brandYellow dark:hover:text-brandBlack transition ease-in-out duration-300',
  });

  const submitButton = CreateElement<HTMLButtonElement>({
    element: 'button',
    type: 'submit',
    styling:
      'my-4 px-4 py-2 w-full rounded-md font-playfairDisplay text-lg md:text-3xl scale-95 text-brandBlack dark:text-brandYellow dark:hover:bg-brandYellow dark:hover:text-brandBlack  hover:scale-100 hover:bg-brandBlack hover:text-brandYellow transition ease-in-out duration-300 ',
  });
  submitButton.innerText = create
    ? 'Create Listing'
    : edit
      ? 'Update Listing'
      : '';

  form.addEventListener('submit', (event: SubmitEvent) => {
    edit && listing ? onEdit(event, listing.id) : create ? onCreate(event) : '';
  });

  container.append(outerDiv);
  outerDiv.append(exitDiv, headline, form);
  exitDiv.appendChild(exitButton);
  form.append(sectionOne, sectionTwo, sectionThree, submitButton);
  sectionOne.append(titleInput, description);
  sectionTwo.append(select, dateInput);
  select.append(
    defaultOption,
    fineArt,
    collectables,
    watchesAndJewelry,
    decorativeArt,
    classicCars,
    furniture
  );
  sectionThree.append(imageText, divImageInput);
  divImageInput.append(imageInput, additionalImageInputs, addImageInputButton);
  if (edit && listing) {
    if (listing.tags.length > 0) {
      select.value = listing.tags[0];
    }
  }

  exitButton?.addEventListener('click', () => {
    container?.classList.add('hidden');
    form?.reset();
    additionalImageInputs.innerHTML = '';
    container.innerHTML = '';
  });
  addImageInputButton?.addEventListener('click', () => {
    imageInputs(additionalImageInputs);
  });
};

const imageInputs = (container: Element) => {
  const currentImageCount = container.querySelectorAll('input').length;

  const addInput = document.getElementById('addImageInput');

  if (currentImageCount <= 1) {
    const div = CreateElement<HTMLDivElement>({
      element: 'div',
      styling: 'w-full flex justify-between gap-2',
    });
    const newInput = document.createElement('input');
    (newInput.type = 'url'), (newInput.className = 'w-full formInput');
    newInput.placeholder = 'Add Image url...';
    newInput.required;

    const button = CreateElement<HTMLButtonElement>({
      element: 'button',
      text: 'X',
      styling:
        'font-playfairDisplay text-lg md:text-2xl border-black text-brandBlack dark:text-brandYellow rounded-full scale-75 hover:scale-100 transition ease-in-out duration-300',
    });
    button.type = 'button';

    button.addEventListener('click', () => {
      div.remove();
      if (addInput) {
        addInput.classList.remove('hidden');
      }
    });

    container.append(div);
    div.append(newInput, button);
  }
  if (currentImageCount === 1) {
    if (addInput) {
      addInput.classList.add('hidden');
    }
  }
};
