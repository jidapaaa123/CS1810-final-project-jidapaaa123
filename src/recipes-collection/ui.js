import { CompletedRecipes } from "./domain.js";

// console.log(await CompletedRecipes());
const nameModeButton = document.getElementById("name-mode-button");
const ingredientModeButton = document.getElementById("ingredient-mode-button");

const formElement = document.getElementById("filter-form");
const formInputsContainer = document.getElementById("form-inputs");
const submitButton = document.getElementById("submit-button");

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

    if (currentMode == "ingredients") {
        const substitutesButton = document.createElement("input");
        substitutesButton.setAttribute("type", "checkbox");
        substitutesButton.setAttribute("name", "allow-substitutes")
        substitutesButton.setAttribute("id", "allow-subsitutes");

        const substitutesLabel = document.createElement("label");
        substitutesLabel.setAttribute("for", "allow-substitutes");
        substitutesLabel.textContent = "allow substitutes";

        const optionalsButton = document.createElement("input");
        optionalsButton.setAttribute("type", "checkbox");
        optionalsButton.setAttribute("name", "allow-missing-optionals")
        optionalsButton.setAttribute("id", "allow-missing-optionals");

        const optionalsLabel = document.createElement("label");
        optionalsLabel.setAttribute("for", "allow-missing-optionals");
        optionalsLabel.textContent = "allow missing optional ingredients";

        // append
        formInputsContainer.appendChild(substitutesButton);
        formInputsContainer.appendChild(substitutesLabel);
        formInputsContainer.appendChild(optionalsButton);
        formInputsContainer.appendChild(optionalsLabel);
    } else {
        const label = document.createElement("label");
        label.setAttribute("for", "name-input");
        label.textContent = "Name: "

        const input = document.createElement("input");
        input.setAttribute("id", "name-input");
        input.setAttribute("name", "name-input");
        input.setAttribute("type", "text");

        // append
        formInputsContainer.appendChild(label);
        formInputsContainer.appendChild(input);
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
