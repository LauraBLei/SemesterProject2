export type loginForm = {
  email?: FormDataEntryValue;
  password?: FormDataEntryValue;
};

export type RegisterForm = {
  name?: FormDataEntryValue;
  email?: FormDataEntryValue;
  password?: FormDataEntryValue;
};

export type CreateForm = {
  title: FormDataEntryValue;
  description: FormDataEntryValue;
  tags: FormDataEntryValue[];
  endsAt: FormDataEntryValue;
  media: Media[];
};

export type Media = {
  url: string;
  alt: string;
};

export type Category = {
  text: string;
  tag: string;
  src: string;
};

export type APIData = {
  data: ListingObject[];
  meta: Meta;
};

export type Meta = {
  isFirstPage: boolean;
  isLastPage: boolean;
  currentPage: number;
  previousPage: number;
  nextPage: number;
  pageCount: number;
  totalCount: number;
};

export type ListingObject = {
  id: string;
  title: string;
  description: string;
  media: Media[];
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

export type ReadPostsAPI = {
  limit?: number;
  page?: number;
  tag?: string;
  sort?: string;
  sortOrder?: string;
  active?: boolean;
  search?: FormDataEntryValue;
};

export type MakeListingType = {
  paginationDiv: HTMLDivElement;
  section: HTMLDivElement;
  API: string;
  tag?: string;
  search?: FormDataEntryValue;
  limit?: number;
  page?: number;
  sort?: string;
  sortOrder?: string;
};

export type MakePaginationType = {
  meta: Meta;
  container: HTMLDivElement;
  paginationDiv: HTMLDivElement;
  API: string;
  tag: string;
  search: FormDataEntryValue;
};
