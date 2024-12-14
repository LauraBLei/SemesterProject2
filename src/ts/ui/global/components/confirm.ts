export const confirmText = (container: string, path: string) => {
  const delay: number = 2000;
  document.getElementById(container)?.classList.remove('hidden');

  setTimeout(() => {
    window.location.href = path;
  }, delay);
};
