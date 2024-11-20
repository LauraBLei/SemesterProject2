export type loginForm = {
  email?: FormDataEntryValue;
  password?: FormDataEntryValue;
};

export type registerForm = {
  name?: FormDataEntryValue;
  email?: FormDataEntryValue;
  password?: FormDataEntryValue;
};

export type ElementHelper = {
  element: any;
  id?: string;
  styling?: string;
  text?: string;
  href?: string;
};