// external recipe API:
export const FetchRecipe = async (search) => {
  const keyword = search.trim().toLowerCase().replaceAll(" ", "+");
  const result = await fetch(
    `https://api.edamam.com/api/recipes/v2?type=public&q=${keyword}&app_id=3bd154e5&app_key=9f5f8f04388714f95a0784569b6bd9f9`
  );
  const body = await result.json();

  const hits = body.hits;
  return [...hits];
};

// const recipes = await FetchRecipe("orange chicken");
// UpdateLocalStorage("recipes", JSON.stringify(recipes))
// console.log(GetFromLocalStorage("recipes"));

// Request url: https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=3bd154e5&app_key=9f5f8f04388714f95a0784569b6bd9f9
