import { AddIngredient, DeleteIngredient, GetIngredients } from "../service.js";

const formElement = document.getElementById("add-form");
const inputElement = document.getElementById("ingredient-input");
const addButton = document.getElementById("add-button");
const errorElement = document.getElementById("error-message");

const pantryContents = document.getElementById("pantry-contents");
const basketContents = document.getElementById("basket-contents");

// form: submission
formElement.addEventListener("submit", async (e) => {
  e.preventDefault();

  await AddIngredient(inputElement.value);
  
  await RenderPantryContents();
  inputElement.value = "";
});

const RenderPantryContents = async () => {
    pantryContents.replaceChildren();

    const allIngredients = await GetIngredients();
    allIngredients.forEach(i => pantryContents.appendChild(MakeIngredientCard(i)))
};

const MakeIngredientCard = (ingredient) => {
  const card = document.createElement("div");
  card.classList.add("ingredient-card");

  const nameElement = document.createElement("div");
  nameElement.classList.add("ingredient-name");
  nameElement.textContent = ingredient;

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-button");
  removeButton.textContent = "X";

  // TO-DO: delete ingredient
  removeButton.addEventListener("click", async () => {
    await DeleteIngredient(ingredient);
    await RenderPantryContents();
  });

  card.appendChild(nameElement);
  card.appendChild(removeButton);

  return card;
};

RenderPantryContents();
console.log(await GetIngredients())