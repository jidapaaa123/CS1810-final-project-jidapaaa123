import { GetAllRecipes, UpdateRecipe } from "../service.js";

const invalidCharacters = ["@", "/", "(", ")"];

// recipe's + added this run
let localIngredients = null;
export const GetLocalIngredients = async () => {
  if (localIngredients == null) { // need to instantiate
    const recipe = await GetRecipe();
    localIngredients = [...recipe.ingredients];
  }

  return [...localIngredients];
};

const hasInvalidChars = (string) => {
  for (const char of invalidCharacters) {
    if (string.includes(char)) {
      return true;
    }
  }

  return false;
};

export const EvaluateIngredientInput = (ingredient, subsString) => {
  if (
    ingredient == null ||
    ingredient == undefined ||
    ingredient.trim() == ""
  ) {
    return {
      isValid: false,
      message: "Ingredient name cannot be empty!",
    };
  }

  if (hasInvalidChars(ingredient) || ingredient.includes(",")) {
    return {
      isValid: false,
      message: "Ingredient name contains some invalid characters",
    };
  }

  if (hasInvalidChars(subsString)) {
    return {
      isValid: false,
      message: "Substitutes contains some invalid characters",
    };
  }

  return {
    isValid: true,
    message: "",
  };
};

// returns NULL if none is found
const GetId = () => {
  if (!document.location.search.includes("?")) {
    return null;
  }

  const queryString = document.location.search.split("?")[1];
  const parts = queryString.split("=");

  if (parts[0] != "id" || parts[1].trim() == "") {
    return null;
  }

  return parts[1];
};

export const GetRecipe = async () => {
  const id = GetId();
  if (id == null) {
    return null;
  }

  const allRecipes = await GetAllRecipes();

  const recipe = allRecipes.find((r) => r.id == id);
  // assuming this method is only called once a load

  // if (recipe != undefined) {
  //   localIngredients = recipe.ingredients;
  // }

  return recipe == undefined ? null : recipe;
};

export const AddLocalIngredient = async (ingredient, subsString, isOptional) => {
  const currentStrings = localIngredients.map((l) => l.name);
  if (currentStrings.includes(ingredient)) {
    return; // no duplicates allowed
  }

  const substitutes = subsString.split(",");
  const cleanSubstitutes = substitutes.filter((s) => s != "");

  if (localIngredients == null) {
    localIngredients = [];
  }

  localIngredients.push({
    name: ingredient,
    isOptional: isOptional,
    substitutes: cleanSubstitutes,
  });

  console.log(localIngredients);
};

export const DeleteLocalIngredient = (ingredient) => {
  const names = localIngredients.map(l => l.name);
  const index = names.indexOf(ingredient.name); // should always be found tbh

  localIngredients.splice(index, 1);
}

export const StringifyIngredientDisplay = (ingredient) => {
  let string = ingredient.name;
  const subs = ingredient.substitutes;
  if (subs.length > 0) {
    string += " (or ";

    subs.forEach((s) => {
      string += `${s}/`;
    });

    string = string.slice(0, -1) + ")";
  }

  return string;
};

export const ResetRecipe = async () => {
  const recipe = await GetRecipe();

  recipe.ingredients = [];
  recipe.instructions = "";
  recipe.image = "";

  await UpdateRecipe(recipe);
};

export const SaveRecipe = async (image, instructions) => {
  const recipe = await GetRecipe();

  const updatedIngredients = [...await GetLocalIngredients()];
  const hasRequiredInfo = updatedIngredients.length != 0 && !IsEmpty(image) && !IsEmpty(instructions);

  const updated = {
    id: recipe.id,
    name: recipe.name,
    isPending: true, // still pending
    hasRequiredInfo: hasRequiredInfo,
    image: image,
    ingredients: updatedIngredients,
    instructions: instructions,
  };
  
  await UpdateRecipe(updated);
}

export const UncompleteRecipe = async (recipe) => {
  recipe.isPending = true;

  await UpdateRecipe(recipe);
};

// export const SaveRecipe = async (recipe) => {
//   await UpdateRecipe(recipe);
// };
const IsEmpty = (string) => {
  return (string == null || string == undefined || string.trim() == "");
}