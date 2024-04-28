import { AddLocalIngredient, DeleteLocalIngredient, EvaluateIngredientInput, GetLocalIngredients, GetRecipe, ResetRecipe, SaveRecipe, StringifyIngredientDisplay, UncompleteRecipe } from "./domain.js";

const mainContent = document.getElementById("main-content");

// RenderPage (async) --> figures out the recipe info then calls others to feed synchronous info
const RenderPage = async () => {
  mainContent.replaceChildren();

  const recipe = await GetRecipe();
  if (recipe == null) {
    mainContent.textContent =
      "Cannot find a recipe with the specified id in the query";
  }

  if (recipe.isPending) {
    const h2 = document.createElement("h2");
    h2.setAttribute("id", "heading");

    const status = document.createElement("span");
    status.classList.add("emphasize");
    status.textContent = "(Pending)";

    h2.textContent = recipe.name + " ";
    h2.appendChild(status);

    const description = document.createElement("div");
    description.setAttribute("id", "description");
    description.textContent =
      "Sections with * means information is still required in order to mark recipe complete (refreshes every save)";

    mainContent.appendChild(h2);
    mainContent.appendChild(description);
    mainContent.appendChild(await MakeRecipeForm(recipe));
  } else {
    const h2 = document.createElement("h2");
    h2.setAttribute("id", "heading");
    h2.textContent = recipe.name;

    const uncompleteButton = document.createElement("button");
    uncompleteButton.setAttribute("id", "uncomplete-button");
    uncompleteButton.textContent = "Mark As Incomplete";

    // TODO - uncomplete button
    uncompleteButton.addEventListener("click", async (e) => {
      e.preventDefault();

      await UncompleteRecipe(recipe);
      await RenderPage();
      // console.log("Uncomplete NOTImplemented");
    });

    mainContent.appendChild(h2);
    mainContent.appendChild(uncompleteButton);
    mainContent.appendChild(MakeRecipeContainer(recipe));
  }
};

// FINISHED RECIPE FUNCTIONS:
function MakeRecipeContainer(recipe) {
    const container = document.createElement("section");
    container.setAttribute("id", "finished-recipe-container");

    const topHalf = document.createElement("article");
    topHalf.setAttribute("id", "top-half");

    const image = document.createElement("img");
    image.setAttribute("id", "recipe-image");
    image.setAttribute("src", recipe.image);

    topHalf.appendChild(image);
    topHalf.appendChild(MakeIngredientsContainer(recipe.ingredients));

    // do instructions-half
    const instructionsHalf = document.createElement("article");
    instructionsHalf.setAttribute("id", "instructions-half");

    const h3 = document.createElement("h3");
    h3.setAttribute("id", "instructions-title");
    h3.textContent = "Instructions";

    const instructions = document.createElement("div");
    instructions.setAttribute("id", "instructions");
    instructions.textContent = recipe.instructions;

    instructionsHalf.appendChild(h3);
    instructionsHalf.appendChild(instructions);

    container.appendChild(topHalf);
    container.appendChild(instructionsHalf);

    return container;
}

function MakeIngredientsContainer(ingredients) {
  const required = ingredients.filter((i) => i.isOptional == false);
  const optional = ingredients.filter((i) => i.isOptional == true);

  const container = document.createElement("div");
  container.setAttribute("id", "ingredients-container");

  const requiredTitle = document.createElement("h3");
  requiredTitle.classList.add("ingredients-title");
  requiredTitle.textContent = "Required Ingredients";

  const requiredList = document.createElement("ul");
  requiredList.classList.add("ingredients-list");

  required.forEach(i => {
    const li = document.createElement("li");
    li.classList.add("ingredient-bullet");
    li.textContent = StringifyIngredientDisplay(i);

    requiredList.appendChild(li);
  });

  const optionalTitle = document.createElement("h3");
  optionalTitle.classList.add("ingredients-title");
  optionalTitle.textContent = "Optional Ingredients";

  const optionalList = document.createElement("ul");
  optionalList.classList.add("ingredients-list");

  optional.forEach(i => {
    const li = document.createElement("li");
    li.classList.add("ingredient-bullet");
    li.textContent = StringifyIngredientDisplay(i);

    optionalList.appendChild(li);
  });

  container.appendChild(requiredTitle);
  container.appendChild(requiredList);
  container.appendChild(optionalTitle);
  container.appendChild(optionalList);

  return container;
}

// PENDING RECIPE FUNCTIONS:
async function MakeRecipeForm(recipe) {
  const form = document.createElement("form");
  form.setAttribute("id", "drafting-form");

  const ingredients = await GetLocalIngredients();

  form.appendChild(MakeIngredientsSection(ingredients));
  form.appendChild(MakeInstructionsSection(recipe.instructions));
  form.appendChild(MakeDisplaySection(recipe.image));
  form.appendChild(MakeResetSaveSection());

  // FORM: submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("You seem to have submitted the form... well that does nothing");
  });

  return form;
}

function MakeIngredientsSection(ingredientObjects) {
  const isMissing =
    ingredientObjects == null ||
    ingredientObjects == undefined ||
    ingredientObjects.length == 0;

  const required = ingredientObjects.filter((i) => i.isOptional == false);
  const optional = ingredientObjects.filter((i) => i.isOptional == true);

  const section = document.createElement("fieldset");
  section.classList.add("form-section");
  section.setAttribute("id", "ingredients-section");

  const h3 = document.createElement("h3");
  h3.classList.add("section-title");
  h3.textContent = "Ingredients";
  if (isMissing) {
    h3.appendChild(MissingAsterisk());
  }

  const boxesContainer = document.createElement("div");
  boxesContainer.setAttribute("id", "ingredient-boxes-container");

  // PREVIEW-BOX
  const previewBox = document.createElement("article");
  previewBox.setAttribute("id", "preview-box");

  const previewTitle = document.createElement("h4");
  previewTitle.classList.add("box-title");
  previewTitle.textContent = "Preview:";

  const requiredSection = document.createElement("article");
  requiredSection.classList.add("preview-section");

  const reqSectionTitle = document.createElement("div");
  reqSectionTitle.classList.add("preview-section-title");
  reqSectionTitle.textContent = "Required";

  const reqSectionContents = document.createElement("div");
  reqSectionContents.classList.add("preview-section-contents");
  required.forEach((obj) =>
    reqSectionContents.appendChild(MakeIngredientCard(obj))
  );

  // bundle up preview-section
  requiredSection.appendChild(reqSectionTitle);
  requiredSection.appendChild(reqSectionContents);

  const optionalSection = document.createElement("article");
  optionalSection.classList.add("preview-section");

  const optionalSectionTitle = document.createElement("div");
  optionalSectionTitle.classList.add("preview-section-title");
  optionalSectionTitle.textContent = "Optional";

  const optionalSectionContents = document.createElement("div");
  optionalSectionContents.classList.add("preview-section-contents");
  optional.forEach((obj) =>
    reqSectionContents.appendChild(MakeIngredientCard(obj))
  );

  // bundle up preview-section
  optionalSection.appendChild(optionalSectionTitle);
  optionalSection.appendChild(optionalSectionContents);

  // bundle up preview-box
  previewBox.appendChild(previewTitle);
  previewBox.appendChild(requiredSection);
  previewBox.appendChild(optionalSection);

  // ADDER BOX
  const adderBox = document.createElement("article");
  adderBox.setAttribute("id", "adder-box");

  const adderTitle = document.createElement("h4");
  adderTitle.classList.add("box-title");
  adderTitle.textContent = "Add Ingredient:";

  const adderInfo = document.createElement("div");
  adderInfo.setAttribute("id", "adder-info");

  // part 1/2: basic info
  const basicInfo = document.createElement("div");
  basicInfo.setAttribute("id", "basic-info-inputs");

  const nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", "name-input");
  nameLabel.textContent = "Name: ";

  const nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("name", "name-input");
  nameInput.setAttribute("id", "name-input");
  nameInput.setAttribute("autocomplete", "off");

  const optionalitySelect = document.createElement("select");
  optionalitySelect.setAttribute("name", "optionality-input");
  optionalitySelect.setAttribute("id", "optionality-input");

  const requiredOption = document.createElement("option");
  requiredOption.setAttribute("value", "required");
  requiredOption.textContent = "required";

  const optionalOption = document.createElement("option");
  optionalOption.setAttribute("value", "optional");
  optionalOption.textContent = "optional";

  optionalitySelect.appendChild(requiredOption);
  optionalitySelect.appendChild(optionalOption);

  basicInfo.appendChild(nameLabel);
  basicInfo.appendChild(nameInput);
  basicInfo.appendChild(optionalitySelect);

  // part 2/2: advanced info
  const advancedInfo = document.createElement("div");
  advancedInfo.setAttribute("id", "advanced-info-inputs");

  const substitutesSection = document.createElement("article");
  substitutesSection.setAttribute("id", "substitutes-section");

  const substitutesLabel = document.createElement("label");
  substitutesLabel.setAttribute("for", "substitutes-text");
  substitutesLabel.textContent = `Substitutes: (separate by ","")`;

  const substitutesInput = document.createElement("textarea");
  substitutesInput.setAttribute("name", "substitutes-text");
  substitutesInput.setAttribute("id", "substitutes-text");
  substitutesInput.setAttribute("cols", "15");
  substitutesInput.setAttribute("rows", "2");

  substitutesSection.appendChild(substitutesLabel);
  substitutesSection.appendChild(substitutesInput);

  const addButtonSection = document.createElement("article");
  addButtonSection.setAttribute("id", "add-button-section");

  const addButton = document.createElement("button");
  addButton.setAttribute("id", "add-button");
  addButton.textContent = "Add!";

  // TO-DO: add button adds ingredient
  addButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const nameElement = document.getElementById("name-input");
    const substitutesElement = document.getElementById("substitutes-text");
    const optionalityElement = document.getElementById("optionality-input");
    const errorElement = document.getElementById("error-message");

    const nameInput = nameElement.value.trim().toLowerCase();
    const substitutesInput = substitutesElement.value.trim().toLowerCase();
    const optionalityInput = optionalityElement.value;

    const isOptional = optionalityInput == "optional";

    const evaluation = EvaluateIngredientInput(nameInput, substitutesInput);
    errorElement.textContent = evaluation.message;

    if (evaluation.isValid == true) {
      AddLocalIngredient(nameInput, substitutesInput, isOptional);
      nameElement.value = "";
      optionalityElement.value = "required";
      substitutesElement.value = "";

      await RenderPage();
    }
  });

  const error = document.createElement("div");
  error.setAttribute("id", "error-message");
  error.textContent = "";

  addButtonSection.appendChild(addButton);
  addButtonSection.appendChild(error);

  // advanced-info = substitutes-section + add-button-section
  advancedInfo.appendChild(substitutesSection);
  advancedInfo.appendChild(addButtonSection);

  // bundle up adder-info
  adderInfo.appendChild(basicInfo);
  adderInfo.appendChild(advancedInfo);

  // bundle up adder-box
  adderBox.appendChild(adderTitle);
  adderBox.appendChild(adderInfo);

  // now INGREDIENT-BOXES-CONTAINER: preview-box + adder-box
  boxesContainer.appendChild(previewBox);
  boxesContainer.appendChild(adderBox);

  // ingredients-section = title + ingredient-boxes-container
  section.appendChild(h3);
  section.appendChild(boxesContainer);

  return section;
}

function MakeIngredientCard(ingredient) {
  const card = document.createElement("div");
  card.classList.add("ingredient-card");

  const nameElement = document.createElement("div");
  nameElement.classList.add("ingredient-name");
  nameElement.textContent = StringifyIngredientDisplay(ingredient);

  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-button");
  removeButton.textContent = "X";

  // TO-DO: delete ingredient
  removeButton.addEventListener("click", async (e) => {
    e.preventDefault();

    DeleteLocalIngredient(ingredient);
    await RenderPage();
  });

  card.appendChild(nameElement);
  card.appendChild(removeButton);

  return card;
}

function MakeInstructionsSection(instructions) {
  const isMissing = instructions == null || instructions.trim() == "";

  const section = document.createElement("fieldset");
  section.classList.add("form-section");
  section.setAttribute("id", "instructions-section");

  const h3 = document.createElement("h3");
  h3.classList.add("section-title");
  h3.textContent = "Instructions";
  if (isMissing) {
    h3.appendChild(MissingAsterisk());
  }

  const container = document.createElement("article");
  container.setAttribute("id", "instructions-container");

  const label = document.createElement("label");
  label.setAttribute("for", "instructions-text");
  label.textContent = "Recipe Instructions:";

  const textarea = document.createElement("textarea");
  textarea.setAttribute("name", "instructions-text");
  textarea.setAttribute("id", "instructions-text");
  textarea.setAttribute("cols", "15");
  textarea.setAttribute("rows", "15");

  textarea.value = instructions;

  container.appendChild(label);
  container.appendChild(textarea);

  section.appendChild(h3);
  section.appendChild(container);

  return section;
}

function MakeDisplaySection(image) {
  const isMissing = image == null || image.trim() == "";

  const section = document.createElement("fieldset");
  section.classList.add("form-section");
  section.setAttribute("id", "display-section");

  const h3 = document.createElement("h3");
  h3.classList.add("section-title");
  h3.textContent = "Display";
  if (isMissing) {
    h3.appendChild(MissingAsterisk());
  }

  const container = document.createElement("article");
  container.setAttribute("id", "image-container");

  const label = document.createElement("label");
  label.setAttribute("for", "image-url");
  label.textContent = "Image URL: ";

  const input = document.createElement("input");
  input.setAttribute("type", "url");
  input.setAttribute("name", "image-url");
  input.setAttribute("id", "image-url");
  input.value = image;

  container.appendChild(label);
  container.appendChild(input);

  section.appendChild(h3);
  section.appendChild(container);

  return section;
}

function MakeResetSaveSection() {
  const section = document.createElement("fieldset");
  section.classList.add("form-section");
  section.setAttribute("id", "reset-save-section");

  const h3 = document.createElement("h3");
  h3.classList.add("section-title");
  h3.textContent = "Reset or Save Recipe";

  const aside = document.createElement("aside");
  aside.setAttribute("id", "clarify");
  aside.textContent =
    '"Reset" will clear all your Ingredients, Instructions, and Image. Only the name and ID are untouched';

  const container = document.createElement("article");
  container.setAttribute("id", "actions-container");

  const reset = document.createElement("input");
  reset.setAttribute("type", "reset");
  reset.setAttribute("name", "reset-button");
  reset.setAttribute("id", "reset-button");

  const save = document.createElement("input");
  save.setAttribute("type", "submit");
  save.setAttribute("name", "save-button");
  save.setAttribute("id", "save-button");
  save.setAttribute("value", "Save!");

  // TO-DO: reset and save
  reset.addEventListener("click", async (e) => {
    e.preventDefault();

    await ResetRecipe();
    await RenderPage();
  });
  save.addEventListener("click", async (e) => {
    e.preventDefault();

    const imageElement = document.getElementById("image-url");
    const instructionsElement = document.getElementById("instructions-text");

    await SaveRecipe(imageElement.value, instructionsElement.value);
    await RenderPage();
  });

  container.appendChild(reset);
  container.appendChild(save);

  section.appendChild(h3);
  section.appendChild(aside);
  section.appendChild(container);

  return section;
}

// add this child after setting textcontent
function MissingAsterisk() {
  const span = document.createElement("span");
  span.classList.add("missing");
  span.textContent = "*";
  return span;
}

console.log(await GetLocalIngredients())
RenderPage();