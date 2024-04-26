import { GetAllRecipes } from "../service.js";

export const GetPendingRecipes = async () => {
    const allRecipes = await GetAllRecipes();
    const pending = allRecipes.filter(r => r.isPending == true);

    return [...pending];
}