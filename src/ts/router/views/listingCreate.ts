import { onCreate } from '../../ui/listing/create';
import { CreateElement } from '../../utilities/components';

export const createListing = () => {
  MakePage();
  const button = document.getElementById('closeCreateListing');
  const div = document.getElementById('createListing');
  const createListingButton = document.getElementById('createListingButton');
  const addInput = document.getElementById('addImageInput');
  const imageInput = document.getElementById('additionalInputs') as Element;
  const form = document.getElementById('create') as HTMLFormElement;

  form?.addEventListener('submit', onCreate);
  createListingButton?.addEventListener('click', () => {
    div?.classList.remove('hidden');
  });

  addInput?.addEventListener('click', () => {
    imageInputs(imageInput);
  });

  button?.addEventListener('click', () => {
    div?.classList.add('hidden');
    form?.reset();
    imageInput.innerHTML = '';
  });
};

const MakePage = () => {
  const main = document.querySelector('main');
  const div = CreateElement({
    element: 'div',
    id: 'createListing',
    styling:
      'bg-black/50 w-full h-full absolute hidden flex items-center justify-center',
  });
  div.innerHTML = `
  <div class='border-2 border-green-950 rounded-md max-w-[880px] w-full h-auto p-6 bg-white mt-6 overflow-y-auto'>
  <div class="flex justify-end">
  <button id="closeCreateListing" class=' px-4 py-2 border-2  border-black rounded-full scale-95 hover:scale-100 transition ease-in-out duration-300' >X</button>
  </div>
  <h1 class="text-center border-b-2 border-black text-3xl p-2">
          Create A Listing
        </h1>
        <form class="flex flex-col items-center w-full" id="create">
          <div class="flex flex-col items-center py-3 gap-6 mt-4 w-full">
            <input
              class="w-full border-2 border-black p-2"
              type="text"
              name="title"
              id="title"
              placeholder="Title..."
              maxlength="50"
              required
            />
            <textarea
              class="w-full border-2 border-black p-2 min-h-[100px]"
              type="text"
              name="description"
              id="description"
              placeholder="Add a description..."
              maxlength="300"
              required
            ></textarea>
          </div>
          <div class="flex flex-wrap justify-evenly w-full">
            <select class="m-4 border-2 border-black px-4 py-2" name="category" id="" required>
              <option value="" disabled selected>Category</option>
              <option value="fine_art">Fine Art</option>
              <option value="collectables">Collectables</option>
              <option value="watches_jewelry">Watches and Jewelry</option>
              <option value="decorative_art">Decorative Art</option>
              <option value="classic_cars">Classic Cars</option>
              <option value="furniture">Furniture</option>
            </select>
            <input
              class="m-2 border-2 border-black px-4 py-2"
              type="date"
              name="auctionDate"
              id="auctionDate" required
            />
          </div>
          <div class="flex flex-col items-center w-full">
            <h2 class="place-self-start text-2xl font-bold py-2">Images:</h2>
            <div id='imageInput' class='w-full flex flex-col gap-4'>
            <input
              class="w-full border-2 border-black p-2"
              type="url"
              name="url"
              placeholder="Add Image url..."
              required
            />
            <div id='additionalInputs' class='w-full flex flex-col gap-4'>
            </div>
            </div>
            <button id='addImageInput' type='button'
              class="px-4 py-2 border-2 mt-4 border-black rounded-3xl scale-95 hover:scale-100 transition ease-in-out duration-300"
            >
              + add another image
            </button>
          </div>
          <button
            class="text-3xl px-4 py-2 border-2 mt-4 border-black rounded-3xl scale-95 hover:scale-100 transition ease-in-out duration-300"
            type="submit"
          >
            Create Listing
          </button>
        </form>
        </div>
`;

  main?.append(div);
};
