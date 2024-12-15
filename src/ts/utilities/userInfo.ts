export const isLoggedIn = () => {
  const loggedIn = localStorage.getItem('userInfo');
  return loggedIn;
};

export const userInfo = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') ?? '{}');

  return userInfo;
};
