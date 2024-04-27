import { GetAllRecipes } from "../service.js";

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
  return recipe == undefined ? null : recipe;
};

export const StringifyIngredientDisplay = (ingredient) => {
  console.log(ingredient);

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
