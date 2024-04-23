// external recipe API: 
const FetchRecipe = async (recipe) => {
    const result = await fetch (`https://www.edamam.com/results/recipes/?search=${recipe.trim().toLowerCase()}`);
    const recipes = await result.json();
    return [...recipes];
};

// my C# api: 
export const GuidString = async () => {
    // if something goes wrong, check this url
    const url = "http://localhost:5185/NewGuid";

    const result = await fetch(url);
    const body = await result.json();
    console.log(body);
    return body.guid;
}
GuidString();


// localStorage: used for items in the Basket
const UpdateLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
};

const GetFromLocalStorage = (key) => {
    return localStorage.getItem(key);
};

const RemoveFromLocalStorange = (key) => {
    localStorage.removeItem(key);
}


// const recipes = await FetchRecipe("orange chicken");
// UpdateLocalStorage("recipes", JSON.stringify(recipes))
// console.log(GetFromLocalStorage("recipes"));

// Request url: https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=3bd154e5&app_key=9f5f8f04388714f95a0784569b6bd9f9