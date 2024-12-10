export const initializeGlobalLoader = () => {
  document.documentElement.classList.add('loading');
  document.body.classList.add('loading');
  const loader = document.createElement('div');
  loader.id = 'global-loader';
  loader.className =
    'fixed inset-0 flex items-center justify-center bg-white/70 z-50 hidden';
  loader.innerHTML = `
      <div class="loader w-12 h-12 border-4 border-t-brandYellow border-brandBlack rounded-full animate-spin"></div>
    `;

  document.body.appendChild(loader);
};

export const showLoader = () => {
  const loader = document.getElementById('global-loader');
  if (loader) loader.classList.remove('hidden');
};

export const hideLoader = () => {
  const loader = document.getElementById('global-loader');
  if (loader) loader.classList.add('hidden');
};
