import { readListing } from '../../api/listing/read';
import { onEdit } from '../../ui/listing/update';
import { onCreate } from '../../ui/listing/create';
import { CreateElement } from '../../ui/global/components/createElement';
import { ListingObject } from '../../utilities/types';

export const createAndEditContainer = () => {
  const main = document.querySelector('main');
  const div = CreateElement({
    element: 'div',
    id: 'createEditContainer',
    styling:
      'bg-black/50 w-full h-full absolute hidden flex items-center justify-center',
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

  const outerDiv = CreateElement({
    element: 'div',
    styling:
      'border-2 border-green-950 rounded-md max-w-[880px] w-full h-auto p-6 bg-white mt-6 overflow-y-auto',
  });

  const exitDiv = CreateElement({
    element: 'div',
    styling: 'class="flex justify-end"',
  });

  const exitButton = CreateElement({
    element: 'button',
    styling:
      'px-4 py-2 border-2  border-black rounded-full scale-95 hover:scale-100 transition ease-in-out duration-300',
    id: 'exitButton',
    text: 'X',
  });

  const headline = CreateElement({
    element: 'h1',
    styling: 'text-center border-b-2 border-black text-3xl p-2',
  });
  headline.innerText = create
    ? 'Create A Listing'
    : edit
      ? 'Edit A Listing'
      : '';

  const form = CreateElement({
    element: 'form',
    styling: 'flex flex-col items-center w-full',
  });
  form.id = create ? 'create' : edit ? 'edit' : '';

  const sectionOne = CreateElement({
    element: 'div',
    styling: 'flex flex-col items-center py-3 gap-6 mt-4 w-full',
  });
  const titleInput = CreateElement({
    element: 'input',
    id: 'title',
    styling: 'w-full border-2 border-black p-2',
  });
  titleInput.type = 'text';
  titleInput.name = 'title';
  titleInput.placeholder = 'Title...';
  titleInput.maxlength = '50';
  titleInput.value = edit && listing ? listing.title : '';
  titleInput.required;
  const description = CreateElement({
    element: 'textarea',
    id: 'description',
    styling: 'w-full border-2 border-black p-2 min-h-[100px]',
  });
  description.name = 'description';
  description.placeholder = 'Add a description...';
  description.maxlength = '300';
  description.value = edit && listing ? listing.description : '';
  description.required;

  const sectionTwo = CreateElement({
    element: 'div',
    styling: 'flex flex-wrap justify-evenly w-full',
  });
  const select = CreateElement({
    element: 'select',
    styling: 'm-4 border-2 border-black px-4 py-2',
  });
  select.name = 'category';
  select.required;
  const defaultOption = CreateElement({ element: 'option', text: 'Category' });
  defaultOption.value = '';
  defaultOption.disabled;
  defaultOption.selected;
  const fineArt = CreateElement({ element: 'option', text: 'Fine Art' });
  fineArt.value = 'fine_art';
  const collectables = CreateElement({
    element: 'option',
    text: 'Collectables',
  });
  collectables.value = 'collectables';
  const watchesAndJewelry = CreateElement({
    element: 'option',
    text: 'Watches and Jewelry',
  });
  watchesAndJewelry.value = 'watches_jewelry';
  const decorativeArt = CreateElement({
    element: 'option',
    text: 'Decorative Art',
  });
  decorativeArt.value = 'decorative_art';
  const classicCars = CreateElement({
    element: 'option',
    text: 'Classic Cars',
  });
  classicCars.value = 'classic_cars';
  const furniture = CreateElement({ element: 'option', text: 'Furniture' });
  furniture.value = 'furniture';
  const dateInput = CreateElement({
    element: 'input',
    id: 'auctionDate',
    styling: 'm-2 border-2 border-black px-4 py-2',
  });

  dateInput.type = 'date';
  dateInput.name = 'auctionDate';
  dateInput.required;
  if (edit && listing) {
    const formattedDate = new Date(listing.endsAt).toISOString().split('T')[0];
    dateInput.value = formattedDate || '';
  }

  const sectionThree = CreateElement({
    element: 'div',
    styling: 'flex flex-col items-center w-full',
  });
  const imageText = CreateElement({ element: 'h2', text: 'Images:' });
  const divImageInput = CreateElement({
    element: 'div',
    id: 'imageInput',
    styling: 'w-full flex flex-col gap-4',
  });
  const imageInput = CreateElement({
    element: 'input',
    styling: 'w-full border-2 border-black p-2',
  });
  imageInput.type = 'url';
  imageInput.name = 'url';
  imageInput.placeholder = 'Add Image Url...';
  imageInput.required;
  const additionalImageInputs = CreateElement({
    element: 'div',
    id: 'additionalInputs',
    styling: 'w-full flex flex-col gap-4',
  });
  if (edit && listing) {
    if (listing.media && listing.media.length > 0) {
      imageInput.value = listing.media[0].url || ''; // Populate the first image input
      // Optionally, dynamically add additional image inputs for other URLs
      listing.media.slice(1).forEach((mediaItem) => {
        const additionalInput = CreateElement({
          element: 'input',
          styling: 'w-full border-2 border-black p-2',
        });
        additionalInput.type = 'url';
        additionalInput.name = 'url';
        additionalInput.value = mediaItem.url || '';
        additionalImageInputs.appendChild(additionalInput);
      });
    }
  }
  const addImageInputButton = CreateElement({
    element: 'button',
    id: 'addImageInput',
    text: '+ Add another image',
    styling:
      'px-4 py-2 border-2 mt-4 border-black rounded-3xl scale-95 hover:scale-100 transition ease-in-out duration-300',
  });
  addImageInputButton.type = 'button';

  const submitButton = CreateElement({ element: 'button' });
  submitButton.innerText = create
    ? 'Create Listing'
    : edit
      ? 'Update Listing'
      : '';
  submitButton.type = 'submit';

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
    console.log(listing);
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
  console.log(container);

  const currentImageCount = container.querySelectorAll('input').length;
  console.log('hello from click');
  const addInput = document.getElementById('addImageInput');

  console.log('imageCount', currentImageCount);

  if (currentImageCount <= 1) {
    const div = CreateElement({
      element: 'div',
      styling: 'w-full flex justify-between gap-2',
    });
    const newInput = document.createElement('input');
    (newInput.type = 'url'),
      (newInput.className = 'w-full border-2 border-black p-2');
    newInput.placeholder = 'Add Image url...';
    newInput.required;

    const button = CreateElement({
      element: 'button',
      text: 'X',
      styling:
        'px-4 py-2 border-2  border-black rounded-full scale-95 hover:scale-100 transition ease-in-out duration-300',
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
