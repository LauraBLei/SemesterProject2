export const Icon = (path: string) => {
  return `
      <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#e8eaed"><path d="${path}"/></svg>
      `;
};

type ElementHelper = {
  element: any;
  id?: string;
  styling?: string;
  text?: string;
  href?: string;
};

export const CreateElement = ({
  element,
  styling,
  text,
  id,
  href,
}: ElementHelper) => {
  const item = document.createElement(element);
  item.innerText = text ?? '';
  item.id = id ?? '';
  item.className = styling ?? '';
  if (href) {
    item.href = href;
  }
  return item;
};
