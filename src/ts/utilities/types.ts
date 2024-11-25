export type loginForm = {
  email?: FormDataEntryValue;
  password?: FormDataEntryValue;
};

export type registerForm = {
  name?: FormDataEntryValue;
  email?: FormDataEntryValue;
  password?: FormDataEntryValue;
};

export type createForm = {
  title: FormDataEntryValue;
  description: FormDataEntryValue;
  tags: FormDataEntryValue[];
  endsAt: FormDataEntryValue;
  media: media[];
};

export type media = {
  url: string;
  alt: string;
};

export type Category = {
  text: string;
  tag: string;
  src: string;
};

export type APIData = {
  data: listingObject[];
  meta: meta;
};

export type meta = {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: null;
  nextPage: number;
  pageCount: number;
  totalCount: number;
};

export type listingObject = {
  id: string;
  title: string;
  description: string;
  media: media[];
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
  search?: FormDataEntryValue;
};

export type makeListing = {
  paginationDiv: HTMLDivElement;
  section: HTMLDivElement;
  posts: APIData;
  API: string;
  tag?: string;
  search?: FormDataEntryValue;
};
