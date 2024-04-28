import { FetchRecipe } from "../external-service.js";
import { GuidString, AddRecipe } from "../service.js";

// placeholder return for now
export const GetImportedRecipes = async (searchWord) => {
  //   const recipes = [];
  //   // name, img, url to recipe. the rest? user's work. lol
  //   const recipe1 = {
  //     name: "Orange Chicken",
  //     img: "/layout/importPage.png",
  //     url: "https://snow.edu", // i told you it's placeholder!!!
  //   };
  //   const recipe2 = {
  //     name: "Red Chicken",
  //     img: "/layout/importPage.png",
  //     url: "https://snow.edu", // i told you it's placeholder!!!
  //   };

  //   for (const i of "12345") { // loops 5 times :D
  //     recipes.push(recipe1);
  //     recipes.push(recipe2);
  //   }

  const fetchedRecipes = await FetchRecipe(searchWord); // result.hits, method assumed to banana-proof
  const formatted = fetchedRecipes.map((hit) => {
    const recipeItem = hit.recipe;
    const name = recipeItem.label;
    const img = recipeItem.images.REGULAR.url;
    const url = recipeItem.url;

    // make the user work for ingredients lol
    return {
      name: name,
      img: img,
      url: url,
    };
  });

  return formatted;
};

export const ImportRecipe = async (recipe) => {
  const obj = {
    id: await GuidString(),
    name: recipe.name,
    isPending: true,
    hasRequiredInfo: false,
    image: recipe.img,
    ingredients: [],
    instructions: `Linked recipe at ${recipe.url}`,
  };

  await AddRecipe(obj);
};

export const IsEmpty = (string) => {
  return string === null || string === undefined || string.trim() == "";
};
