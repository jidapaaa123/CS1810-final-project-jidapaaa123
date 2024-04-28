import { GetAllRecipes, GuidString } from "../service.js";

export const GetPendingRecipes = async () => {
  const allRecipes = await GetAllRecipes();
  const pending = allRecipes.filter((r) => r.isPending == true);

  return [...pending];
};

export const MakeNewRecipe = async () => {
  const id = await GuidString();

  return {
    id: id,
    name: "Unnamed Recipe",
    isPending: true,
    hasRequiredInfo: false,
    image: "",
    ingredients: [],
    instructions: "Start drafting your recipe!",
  };
};
