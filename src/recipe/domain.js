import { GetAllRecipes, GuidString } from "../service.js";

// returns NULL if none is found
export const GetRecipeById = async (id) => {
  const allRecipes = await GetAllRecipes();
  console.log(allRecipes);

  const recipe = allRecipes.find((r) => r.id == id);
  return recipe == undefined ? null : recipe;
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
