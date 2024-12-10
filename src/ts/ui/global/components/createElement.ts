import { ElementHelper } from '../../../utilities/types';

export const CreateElement = <T>({
  element,
  styling,
  text,
  id,
  href,
  src,
  alt,
  type,
  name,
  value,
  required,
  forLabel,
  placeholder,
  maxLength,
}: ElementHelper): T => {
  const item = document.createElement(element);
  if (text) item.innerText = text;
  if (id) item.id = id;
  if (styling) item.className = styling;
  if (href) item.href = href;
  if (src) item.src = src;
  if (alt) item.alt = alt;
  if (name) item.name = name;
  if (type) item.type = type;
  if (value) item.value = value;
  if (required) item.required;
  if (forLabel) item.htmlFor = forLabel;
  if (placeholder) item.placeholder = placeholder;
  if (maxLength) item.maxLength = maxLength;
  return item;
};
