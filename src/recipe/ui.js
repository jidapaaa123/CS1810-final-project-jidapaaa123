import { GetRecipeById } from "./domain.js";

const mainElement = document.getElementById("main");

const GetId = () => {
  if (!document.location.search.includes("?")) {
    return null;
  }

  const queryString = document.location.search.split("?")[1];
  const parts = queryString.split("=");

  if (parts[0] != "id" || parts[1].trim() == "") {
    return null;
  }

  return parts[1];
};

const RenderRecipe = async () => {
  const id = GetId();
  const recipe = await GetRecipeById(id);

  document.title = recipe == null ? "Recipe NOT found" : `Recipe - ${recipe.name}`;
  if (recipe == null) {
    mainElement.textContent = `Cannot find recipe with id ${id}`;
    return;
  }

  let ingre = "";
  
  recipe.ingredients.forEach(i => {
    let text = `${i.isOptional ? "@" : ""}${i.name}(`;

    i.substitutes.forEach(s => {
        text += s + "/";
    });
    text += ")";
    ingre += text;
  });

  console.log(recipe)
  let text = `NAME: ${recipe.name}
  <br />
  hasRequiredInfo: ${recipe.hasRequiredInfo}
  <br />
  isPending: ${recipe.isPending}
  <br />
  ingredients: ${ingre}
  <br />
  INSTRUCTIONS: ${recipe.instructions}`;

  mainElement.innerHTML = text;

};

RenderRecipe();
