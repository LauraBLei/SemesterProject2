export type loginForm = {
  email?: FormDataEntryValue;
  password?: FormDataEntryValue;
};

export type registerForm = {
  name?: FormDataEntryValue;
  email?: FormDataEntryValue;
  password?: FormDataEntryValue;
};

export type media = [
  {
    url: string;
    alt: string;
  },
];

export type listingObject = {
  id: string;
  title: string;
  description: string;
  media: media;
  count: {
    bids: number;
  };
  seller: {
    name: string;
    avatar: {
      url: string;
      alt: string;
    };
    bio: string;
  };
};

export type ElementHelper = {
  element: any;
  id?: string;
  styling?: string;
  text?: string;
  href?: string;
  src?: string;
  alt?: string;
};

export type readPostsAPI = {
  limit?: number;
  page?: number;
  tag?: string;
  sort?: string;
  sortOrder?: string;
  active?: boolean;
};
