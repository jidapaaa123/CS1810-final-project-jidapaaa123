import {
  GetFromLocalStorage,
  UpdateLocalStorage,
  ClearLocalStorage,
} from "../localStorage-service.js";

// localStorage: [key, value] --> [Items, [string, string, string]]
const key = "Items";

export const GetBasketContents = () => {
  const contents = GetFromLocalStorage(key);
  return contents == null ? [] : JSON.parse(contents).ingredients;
};

export const AddToBasket = (ingredient) => {
  const currentBasket = GetBasketContents();
  if (currentBasket.includes(ingredient)) {
    return;
  }

  currentBasket.push(ingredient);
  const obj = { ingredients: currentBasket };

  UpdateLocalStorage(key, JSON.stringify(obj));
};

export const RemoveFromBasket = (ingredient) => {
  // there should be exactly 1 ingredient of this name
  let currentBasket = GetBasketContents();
  const index = currentBasket.indexOf(ingredient);
  currentBasket.splice(index, 1);

  console.log(currentBasket)
  const obj = { ingredients: currentBasket };

  UpdateLocalStorage(key, JSON.stringify(obj));
};

console.log(GetBasketContents());