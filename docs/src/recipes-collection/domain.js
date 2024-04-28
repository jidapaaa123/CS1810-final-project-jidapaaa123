import { ClearRecipes, GetAllRecipes } from "../service.js";
import { GetBasketContents } from "../pantry/domain.js";

// returns completed recipes (service already re-formats it)
export const CompletedRecipes = async () => {
  const allRecipes = await GetAllRecipes();
  const completed = allRecipes.filter((r) => r.isPending == false);

  return [...completed];
};

// ui.js will splice dependent on the number-input
export const SearchByName = async (search) => {
  const completeds = await CompletedRecipes();
  const keyword = search.trim().toLowerCase();

  if (keyword == undefined || keyword == null || keyword == "") {
    return [...completeds];
  }

  const filtered = completeds.filter((r) =>
    r.name.toLowerCase().includes(keyword)
  );
  return [...filtered];
};

// ui.js will splice dependent on the number-input
export const SearchByIngredients = async (allowSubs, allowOpts) => {
  const completeds = await CompletedRecipes();
  const basketItems = GetBasketContents();
  console.log(completeds);
  console.log(basketItems);

  let filtered = []; // passes through each filter

  for (const recipe of completeds) {
    const rawRequiredIngredients = recipe.ingredients.filter(
      (i) => i.isOptional == false
    );
    const optionalIngredients = recipe.ingredients.filter(
      (i) => i.isOptional == true
    );

    let finalRequiredIngredients = allowOpts
      ? [...rawRequiredIngredients] // allow missing optionals
      : [...rawRequiredIngredients, ...optionalIngredients]; // not allow = consider them required too
    // now, consider requireds and substitutes

    if (satisfyIngredients(basketItems, finalRequiredIngredients, allowSubs)) {
        filtered.push(recipe);
    }
  }

  // have yet to install the nitpicky-proof feature
  console.log(filtered)
  return [...filtered];
};

function satisfyIngredients(availables, requireds, allowSubs) {
    // debugger;
  // normalize
  availables = availables.map((string) => string.trim().toLowerCase());

  for (const obj of requireds) {
    if (availables.includes(obj.name.trim().toLowerCase())) {
      continue; // you already have the original ver.
    }

    // you dont have the original ver...
    if (!allowSubs) {
      return false; // immediately!
    } else {
      // you dont have the original ver but may substitute
      const substitutes = obj.substitutes;

      // if you ALSO don't match any substitutes, you're cooked
      // otherwise you are good :)
      return shareSomeString(substitutes, availables);
    }
  }

  // falling out = continued so far out of loop
  return true;
}

// [string] and [string]
function shareSomeString(array1, array2) {
  const common = array2.filter((string) => array1.includes(string));
  return common.length > 0;
}