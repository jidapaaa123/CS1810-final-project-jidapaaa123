// localStorage: used for items in the Basket
// [key, value] --> [Items, [string, string, string]]

export const UpdateLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const GetFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};

const RemoveFromLocalStorange = (key) => {
  localStorage.removeItem(key);
};

const GetAllLocalStorage = () => {
  return { ...localStorage };
};

export const ClearLocalStorage = () => {
  localStorage.clear();
};
