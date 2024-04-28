import { SearchByName } from "./domain.js";

// console.log(await CompletedRecipes());
const nameModeButton = document.getElementById("name-mode-button");
const ingredientModeButton = document.getElementById("ingredient-mode-button");

const formElement = document.getElementById("filter-form");
const formInputsContainer = document.getElementById("form-inputs");

const resultsContainer = document.getElementById("results-container");

let currentMode = "ingredients"; // ingredients

function StyleBasedOnCurrent() {
  const buttonsInfo =
    currentMode == "name"
      ? {
          active: nameModeButton,
          inactive: ingredientModeButton,
        }
      : {
          active: ingredientModeButton,
          inactive: nameModeButton,
        };
  buttonsInfo.active.classList.add("current-mode");
  buttonsInfo.inactive.classList.remove("current-mode");
}

function RenderInputsBasedOnCurrent() {
  formInputsContainer.replaceChildren();

  const paginationContainer = document.createElement("div");
  paginationContainer.setAttribute("id", "pagination-container");

  const label = document.createElement("label");
  label.setAttribute("for", "max-items-input");
  label.textContent = "Maximum results (if any): ";

  const input = document.createElement("input");
  input.setAttribute("type", "number");
  input.setAttribute("id", "max-items-input");
  input.setAttribute("min", "1");

  paginationContainer.appendChild(label);
  paginationContainer.appendChild(input);

  if (currentMode == "ingredients") {
    const substitutesButton = document.createElement("input");
    substitutesButton.setAttribute("type", "checkbox");
    substitutesButton.setAttribute("name", "allow-substitutes");
    substitutesButton.setAttribute("id", "allow-subsitutes");

    const substitutesLabel = document.createElement("label");
    substitutesLabel.setAttribute("for", "allow-substitutes");
    substitutesLabel.textContent = "allow substitutes";

    const optionalsButton = document.createElement("input");
    optionalsButton.setAttribute("type", "checkbox");
    optionalsButton.setAttribute("name", "allow-missing-optionals");
    optionalsButton.setAttribute("id", "allow-missing-optionals");

    const optionalsLabel = document.createElement("label");
    optionalsLabel.setAttribute("for", "allow-missing-optionals");
    optionalsLabel.textContent = "allow missing optional ingredients";

    // append
    formInputsContainer.appendChild(substitutesButton);
    formInputsContainer.appendChild(substitutesLabel);
    formInputsContainer.appendChild(optionalsButton);
    formInputsContainer.appendChild(optionalsLabel);
    formInputsContainer.appendChild(paginationContainer);
  } else {
    const label = document.createElement("label");
    label.setAttribute("for", "name-input");
    label.textContent = "Name: ";

    const input = document.createElement("input");
    input.setAttribute("id", "name-input");
    input.setAttribute("name", "name-input");
    input.setAttribute("type", "text");
    input.setAttribute("autocomplete", "off");

    // append
    formInputsContainer.appendChild(label);
    formInputsContainer.appendChild(input);
    formInputsContainer.appendChild(paginationContainer);
  }
}

function HandleModeChange(target) {
  if (!(target == "name" || target == "ingredients")) {
    throw "Unknown mode requested"; // this shouldnt happen . . ?
  }

  if (currentMode == target) {
    // same - do nothing
    return;
  }

  // if it's different!
  currentMode = target;

  StyleBasedOnCurrent();
  RenderInputsBasedOnCurrent();
}

// Name Mode: onclick
nameModeButton.addEventListener("click", (e) => {
  console.log("name mode on");
  HandleModeChange("name");
});

// Ingredients Mode: onclick
ingredientModeButton.addEventListener("click", (e) => {
  console.log("ingredients mode on");
  HandleModeChange("ingredients");
});

// FORM: prevent reload
formElement.addEventListener("submit", async (e) => {
  e.preventDefault();

  const maxElement = document.getElementById("max-items-input"); 

  if (currentMode == "ingredients") {
    const allowsSubs = document.getElementById("allow-substitutes").checked;
    const allowsOpts = document.getElementById(
      "allow-missing-optionals"
    ).checked;

    // SearchByIngredients(allowsSubs, allowsOpts)
  } else {
    const inputElement = document.getElementById("name-input");
    const searchWord = inputElement.value; // pretty safe assumption?
    const max = maxElement.value;

    console.log(max === "")

    const results = await SearchByName(searchWord);
    inputElement.value = "";
    maxElement.value = "";

    const toRender = max === "" ? results : results.slice(0, max);

    RenderRecipes(toRender);
  }
});

const RenderRecipes = (recipes) => {
  resultsContainer.replaceChildren();
  recipes.forEach((r) => resultsContainer.appendChild(MakeRecipeCard(r)));
};

const MakeRecipeCard = (recipe) => {
  const card = document.createElement("a");
  card.classList.add("recipe-card");

  card.setAttribute("href", `/pages/recipe.html?id=${recipe.id}`);
  card.setAttribute("target", "_blank");

  const img = document.createElement("img");
  img.classList.add("recipe-image");
  img.setAttribute("src", recipe.image);

  const contents = document.createElement("div");
  contents.classList.add("recipe-contents");

  const nameElement = document.createElement("div");
  nameElement.classList.add("recipe-name");
  nameElement.textContent = recipe.name;

  // include ?
  const idElement = document.createElement("div");
  idElement.classList.add("recipe-id");
  idElement.textContent = `Id: ${recipe.id}`;

  contents.appendChild(nameElement);
  contents.appendChild(idElement);

  card.appendChild(img);
  card.appendChild(contents);

  return card;
};
