import { CompletedRecipes } from "./domain.js";

// console.log(await CompletedRecipes());
const nameModeButton = document.getElementById("name-mode-button");
const ingredientModeButton = document.getElementById("ingredient-mode-button");
const formElement = document.getElementById("filter-form");

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
}

// FORM: prevent reload
formElement.addEventListener("submit", (e) => {
  e.preventDefault();
});

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

const RenderRecipes = (recipes) => {};

const MakeRecipeCard = (recipe) => {};
