// !!!MY C# API!!!
// if something goes wrong, !**CHECK this url**!
const url = "http://localhost:5185";

export const GuidString = async () => {
  const result = await fetch(`${url}/newguid`);
  const body = await result.json();
  console.log(body);

  return body.guid;
};

export const GetAllRecipes = async () => {
  const result = await fetch(`${url}/recipes/get`);
  const body = await result.json();
  console.log(body);

  return body.allRecipes;
};

export const AddRecipe = async (recipe) => {
  await fetch(`${url}/recipes/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });
};

// external recipe API:
const FetchRecipe = async (recipe) => {
  const result = await fetch(
    `https://www.edamam.com/results/recipes/?search=${recipe
      .trim()
      .toLowerCase()}`
  );
  const recipes = await result.json();
  return [...recipes];
};

// localStorage: used for items in the Basket
const UpdateLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

const GetFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};

const RemoveFromLocalStorange = (key) => {
  localStorage.removeItem(key);
};

// const recipes = await FetchRecipe("orange chicken");
// UpdateLocalStorage("recipes", JSON.stringify(recipes))
// console.log(GetFromLocalStorage("recipes"));

// Request url: https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=3bd154e5&app_key=9f5f8f04388714f95a0784569b6bd9f9
