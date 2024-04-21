import { GuidString } from "./svc.js";

const newRecipeButton = document.getElementById("new-recipe-button");
const draftsContainerElement = document.getElementById("draft-card");

/*
recipe item:
{
    id:,
    name:,
    isPending: false,
    hasRequiredInfo: true,
    img:,
    ingredients: [string, string],
    instructions: big string,
}
*/

const MakePendingCard = (recipe) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("draft-card");

    const mainSection = document.createElement("section");
    mainSection.classList.add("draft-main");

    const contentElement = document.createElement("div");
    contentElement.classList.add("draft-content")

    const nameElement = document.createElement("div");
    nameElement.classList.add("draft-name");
    nameElement.textContent = recipe.name;
    const idElement = document.createElement("div");
    idElement.classList("draft-id");
};
