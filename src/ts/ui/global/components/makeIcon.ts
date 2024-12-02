export const Icon = (
  path: string,
  color: string = '#FFFFFF',
  size: string = '30px'
) => {
  return `
        <svg xmlns="http://www.w3.org/2000/svg" height="${size}" viewBox="0 -960 960 960" width="${size}" fill="${color}"><path d="${path}"/></svg>
        `;
};
