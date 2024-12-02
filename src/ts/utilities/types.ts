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
  endsAt: string;
  tags: string[];
  bids: Bid[];
};

export type Bid = {
  amount: number;
  bidder: UserProfileAPI;
  created: string;
  id: string;
  listing: ListingObject;
};

export type ElementHelper = {
  element: any;
  id?: string;
  styling?: string;
  text?: string;
  href?: string;
  src?: string;
  alt?: string;
  type?: string;
  name?: string;
  value?: string;
  required?: boolean;
  forLabel?: string;
  placeholder?: string;
};

export type ReadPostsAPI = {
  username?: string;
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

export type UserProfileAPI = {
  name: string;
  email: string;
  bio: string;
  avatar: Media;
  banner: Media;
  credits: number;
  listings: ListingObject[];
};

export type UpdateProfileInfo = {
  avatar: MediaForm;
  banner: MediaForm;
  bio: FormDataEntryValue;
};

export type MediaForm = {
  url: FormDataEntryValue;
  alt: string;
};
