import { GuidString, GetAllRecipes, AddRecipe, UpdateRecipe } from "../service.js";
import { GetPendingRecipes } from "./domain.js";

const newRecipeButton = document.getElementById("new-recipe-button");
const draftsContainerElement = document.getElementById("drafts-container");

const RenderPendingRecipes = async () => {
  const pendings = await GetPendingRecipes();

  draftsContainerElement.replaceChildren();
  pendings.forEach((p) => {
    draftsContainerElement.appendChild(MakePendingCard(p));
  });
};

const MakePendingCard = (recipe) => {
  const cardElement = document.createElement("div");
  cardElement.classList.add("draft-card");

  const mainSection = document.createElement("section");
  mainSection.classList.add("draft-main");

  const contentElement = document.createElement("div");
  contentElement.classList.add("draft-content");

  const nameElement = document.createElement("div");
  nameElement.classList.add("draft-name");
  nameElement.textContent = recipe.name;
  const idElement = document.createElement("div");
  idElement.classList.add("draft-id");
  idElement.textContent = "Id: " + recipe.id;

  const editElement = document.createElement("button");
  editElement.classList.add("draft-edit");
  editElement.textContent = "Edit";

  // draft-edit: CLICK EVENT
  editElement.addEventListener("click", (e) => {
    window.open(`/pages/recipe.html?id=${recipe.id}`, "_blank")
  });

  contentElement.appendChild(nameElement);
  contentElement.appendChild(idElement);
  mainSection.appendChild(contentElement);
  mainSection.appendChild(editElement);

  const bottomSection = document.createElement("section");
  bottomSection.classList.add("draft-bottom");

  const completeButton = document.createElement("button");
  completeButton.classList.add("mark-complete-button");
  completeButton.textContent = "Mark Complete";
  // complete: CLICK EVENT
  completeButton.addEventListener("click", async (e) => {
    recipe.isPending = false;
    await UpdateRecipe(recipe);

    console.log("Recipe completed!");
    await RenderPendingRecipes();
  });

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "Delete";
  // TODO - delete: CLICK EVENT
  deleteButton.addEventListener("click", (e) => {
    console.log("NotImplemented DELETE recipe");
  });

  bottomSection.appendChild(completeButton);
  bottomSection.appendChild(deleteButton);

  cardElement.appendChild(mainSection);
  cardElement.appendChild(bottomSection);

  return cardElement;
};

// TODO - NEW RECIPE: button
newRecipeButton.addEventListener("click", (e) => {
  console.log("NotImplemented NEW recipe");
});

RenderPendingRecipes();

// const recipe = {
//   id: await GuidString(),
//   name: "red4 salad",
//   isPending: false,
//   hasRequiredInfo: true,
//   image:
//     "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Salad_platter.jpg/1200px-Salad_platter.jpg",
//   ingredients: [
//     {
//       name: "unique ingredient",
//       isOptional: true,
//       substitutes: ["himalayan salt"],
//     },
//   ],
//   instructions: "Cook it",
// };

// AddRecipe(recipe);
