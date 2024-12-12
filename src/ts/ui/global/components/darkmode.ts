export const initializeDarkMode = () => {
  const savedTheme = localStorage.getItem('theme');
  const lightMode = document.getElementById('lightMode');
  const darkMode = document.getElementById('darkMode');

  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    lightMode?.classList.add('hidden');
  } else {
    document.documentElement.classList.remove('dark');
    darkMode?.classList.add('hidden');
  }
};

export const toggleDarkMode = () => {
  const htmlElement = document.documentElement; // Get the root <html> element

  // Toggle dark mode class
  if (htmlElement.classList.contains('dark')) {
    htmlElement.classList.remove('dark'); // Disable dark mode
    localStorage.setItem('theme', 'light'); // Save preference
  } else {
    htmlElement.classList.add('dark'); // Enable dark mode
    localStorage.setItem('theme', 'dark'); // Save preference
  }
};
