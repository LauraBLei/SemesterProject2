import { confirmText } from '../../ui/global/components/confirm';
import { CreateForm } from '../../utilities/types';
import { API } from '../APIEndPoints';
import { headers } from '../headers';

export async function updateListing(
  id: string,
  { title, description, tags, endsAt, media }: CreateForm
) {
  const bodyElement = {
    title: title,
    description: description,
    tags: tags,
    endsAt: endsAt,
    media: media,
  };

  try {
    const response = await fetch(API.AUCTION_LISTINGS + '/' + id, {
      method: 'Put',
      headers: headers(),
      body: JSON.stringify(bodyElement),
    });

    if (response.ok) {
      const div = document.getElementById('createEditContainerg');
      const form = document.getElementById('edit') as HTMLFormElement;
      div?.classList.add('hidden');
      form?.reset();
      confirmText('createEditMessage', '/profile/');
    }
  } catch (error) {
    alert('Something went wrong trying to update your post!');
  }
}
