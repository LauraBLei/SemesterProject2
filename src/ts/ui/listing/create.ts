import { createPost } from '../../api/listing/create';
import { CreateForm, Media } from '../../utilities/types';

export const onCreate = (event: SubmitEvent) => {
  event?.preventDefault();
  const form = event.target as HTMLFormElement;
  const images: Media[] = [];
  const tags: FormDataEntryValue[] = [];
  const formData = new FormData(form);

  const category: FormDataEntryValue = formData.get('category') ?? '';
  tags.push(category);

  const imageInputs =
    form.querySelectorAll<HTMLInputElement>('input[type="url"]');

  imageInputs.forEach((input) => {
    const imageUrl = input.value.trim();
    if (imageUrl) {
      images.push({
        url: imageUrl,
        alt: 'Auction Image',
      });
    }
  });
  const data: CreateForm = {
    title: formData.get('title') ?? '',
    description: formData.get('description') ?? '',
    tags: tags,
    endsAt: formData.get('auctionDate') ?? '',
    media: images,
  };
  console.log('tag ', formData.get('category'));

  console.log('create data: ', data);

  createPost(data);
};
