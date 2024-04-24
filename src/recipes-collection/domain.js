import { GetAllRecipes } from "../service.js";

// returns completed recipes & re-formats each recipe's ingredients from string into list
export const CompletedRecipes = async () => {
    const allRecipes = await GetAllRecipes();
    const completed = allRecipes.filter(r => r.isPending == false);
    const formatted = completed.map(r => {
        const ingredientsList = r.ingredients.split(',');
        r.ingredients = ingredientsList;
        return r;
    })

    return formatted;
};