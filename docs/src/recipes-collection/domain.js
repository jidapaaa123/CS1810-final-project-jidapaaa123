import { ClearRecipes, GetAllRecipes } from "../service.js";

// returns completed recipes (service already re-formats it)
export const CompletedRecipes = async () => {
    const allRecipes = await GetAllRecipes();
    const completed = allRecipes.filter(r => r.isPending == false);

    return [...completed];
};
console.log(await CompletedRecipes())

export const SearchByName = async (search) => {
    const completeds = await CompletedRecipes();
    const keyword = search.trim().toLowerCase();

    if (keyword == undefined || keyword == null || keyword == "") {
        return [...completeds];
    }

    const filtered = completeds.filter(r => r.name.toLowerCase().includes(keyword));
    return [...filtered];
}

// export const SearchByIngredients = async (allowSubs, allowsOpts) => {

// }