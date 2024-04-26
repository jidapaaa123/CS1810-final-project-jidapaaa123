import { GetAllRecipes } from "../service.js";

// returns NULL if none is found
export const GetRecipeById = async (id) => {
    const allRecipes = await GetAllRecipes();
    console.log(allRecipes)

    const recipe = allRecipes.find(r => r.id == id);
    return recipe == undefined ? null : recipe;
};
