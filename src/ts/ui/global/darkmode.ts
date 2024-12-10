export const initializeDarkMode = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
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
