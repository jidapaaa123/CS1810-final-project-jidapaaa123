import { AddIngredient, DeleteIngredient, GetIngredients } from "../service.js";
import {
  AddToBasket,
  GetBasketContents,
  RemoveFromBasket,
  EvaluateInput,
} from "./domain.js";

const formElement = document.getElementById("add-form");
const inputElement = document.getElementById("ingredient-input");
const addButton = document.getElementById("add-button");
const errorElement = document.getElementById("error-message");

const pantryContents = document.getElementById("pantry-contents");
const basketElement = document.getElementById("basket");
const basketContents = document.getElementById("basket-contents");

// form: submission
formElement.addEventListener("submit", async (e) => {
  e.preventDefault();

  await AddIngredient(inputElement.value);

  await RenderPantryContents();
  inputElement.value = "";
});
// form: validate button/error each keystroke
formElement.addEventListener("input", (e) => {
  const input = inputElement.value;

  const evaluation = EvaluateInput(input);
  addButton.disabled = !evaluation.isValid;
  errorElement.textContent = evaluation.message;

  if (evaluation.isValid) {
    addButton.classList.remove("disabled");
  } else {
    addButton.classList.add("disabled");
  }
});

const RenderPantryContents = async () => {
  pantryContents.replaceChildren();

  const allIngredients = await GetIngredients();
  allIngredients.forEach((i) =>
    pantryContents.appendChild(MakeIngredientCard(i))
  );
};

const RenderBasketContents = () => {
  basketContents.replaceChildren();

  const allIngredients = GetBasketContents();
  allIngredients.forEach((i) => basketContents.appendChild(MakeBasketCard(i)));
};

const MakeIngredientCard = (ingredient) => {
  const card = document.createElement("div");
  card.classList.add("ingredient-card");

  // drag n drop support - dropped item
  card.draggable = true;
  card.addEventListener("dragstart", (e) => {
    basketElement.classList.add("highlight-droparea");
    e.dataTransfer.setData("ingredient", ingredient);
  });

  const nameElement = document.createElement("div");
  nameElement.classList.add("ingredient-name");
  nameElement.textContent = ingredient;

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-button");
  removeButton.textContent = "X";

  // delete ingredient
  removeButton.addEventListener("click", async () => {
    await DeleteIngredient(ingredient);
    await RenderPantryContents();
  });

  card.appendChild(nameElement);
  card.appendChild(removeButton);

  return card;
};

const MakeBasketCard = (ingredient) => {
  const card = document.createElement("div");
  card.classList.add("ingredient-card");

  const nameElement = document.createElement("div");
  nameElement.classList.add("ingredient-name");
  nameElement.textContent = ingredient;

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-button");
  removeButton.textContent = "X";

  // delete ingredient from Basket
  removeButton.addEventListener("click", () => {
    RemoveFromBasket(ingredient);
    RenderBasketContents();
  });

  card.appendChild(nameElement);
  card.appendChild(removeButton);

  return card;
};

// DRAG n DROP FEATURE - dropzone
basketElement.addEventListener("dragover", (e) => {
  e.preventDefault();
});
basketElement.addEventListener("drop", (e) => {
  basketElement.classList.remove("highlight-droparea");
  const ingredient = e.dataTransfer.getData("ingredient");

  AddToBasket(ingredient);
  RenderBasketContents();
});

// on loadup:
addButton.disabled = true;
addButton.classList.add("disabled");
RenderPantryContents();
RenderBasketContents();
