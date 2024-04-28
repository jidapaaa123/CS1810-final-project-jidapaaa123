// !!!MY C# API!!!
// if something goes wrong, !**CHECK this url**!
const url = "http://localhost:5185";

export const GuidString = async () => {
  const result = await fetch(`${url}/newguid`);
  const body = await result.json();

  return body.guid;
};

// remember: ingredient objects get sent as string from the api
export const GetAllRecipes = async () => {
  const result = await fetch(`${url}/recipes/get`);
  const body = await result.json();

  for (const recipe of body.allRecipes) {
    const ingredients = recipe.ingredients.split(",").map((i) => {
      const optional = i[0] == "@";
      const parts = i.replace("@", "").split("("); // 2 possible formats: [name, substitutes)] OR [name]

      const name = parts[0];
      if (parts.length == 1) {
        // no substitutes
        return {
          name: name,
          isOptional: optional,
          substitutes: [],
        };
      }

      // deal with substitutes! --> substitutes)
      const substitutes = parts[1].replace(")", ""); // salt/pepper) --> salt/pepper

      return {
        name: name,
        isOptional: optional,
        substitutes: substitutes.split("/"), // salt/pepper --> ["salt", "pepper"]
      };
    });

    // skips empty ingredient caused by JSON-ing Unnamed Recipe's ingredients
    recipe.ingredients = ingredients.filter((i) => i.name.trim() != "");
  }

  return body.allRecipes;
};

export const GetIngredients = async () => {
  const result = await fetch(`${url}/ingredients/get`);
  const body = await result.json();

  return body.allIngredients;
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

export const AddIngredient = async (name) => {
  const nameObj = { name };

  await fetch(`${url}/ingredients/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nameObj),
  });
};

export const UpdateRecipe = async (recipe) => {
  await fetch(`${url}/recipes/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });
};

export const DeleteRecipe = async (recipe) => {
  await fetch(`${url}/recipes/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });
};

export const DeleteIngredient = async (name) => {
  const nameObj = { name };

  await fetch(`${url}/ingredients/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nameObj),
  });
};

export const ClearRecipes = async () => {
  await fetch(`${url}/recipes/clear`);
};
