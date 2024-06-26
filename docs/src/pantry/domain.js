import {
  GetFromLocalStorage,
  UpdateLocalStorage,
} from "../localStorage-service.js";

// localStorage: [key, value] --> [Items, [string, string, string]]
const key = "Items";

const invalidCharacters = ["@", "/", ",", "(", ")"];

const hasInvalidChars = (string) => {
  for (const char of invalidCharacters) {
    if (string.includes(char)) {
      return true;
    }
  }

  return false;
};

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

  const obj = { ingredients: currentBasket };

  UpdateLocalStorage(key, JSON.stringify(obj));
};

export function EvaluateInput(input) {
  if (input == undefined || input == null || input.trim() == "") {
    return {
      isValid: false,
      message: "Enter something!",
    };
  }

  if (hasInvalidChars(input)) {
    return {
      isValid: false,
      message: "Contains invalid characters",
    };
  }

  // no error conditions!
  return {
    isValid: true,
    message: "",
  };
}