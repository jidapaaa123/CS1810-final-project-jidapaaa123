import { GetImportedRecipes, IsEmpty } from "./domain.js";

const mainContentElement = document.getElementById("main-content");
const formElement = document.getElementById("form");
const nameInputElement = document.getElementById("name-input");
const submitButton = document.getElementById("submit-button");
const errorElement = document.getElementById("error");
const resultsContainerElement = document.getElementById("results-container");

const disableSubmit = (yes) => {
    if (yes)
    {
        submitButton.disabled = true;
        submitButton.classList.add("disabled");
        return true; // "is it disabled now?"
    }
    else
    {
        submitButton.disabled = false;
        submitButton.classList.remove("disabled");
        return false; // "is it disabled now?"
    }
};
// PAGE LOAD: disable search button
disableSubmit(true);

// FORM: validate input
formElement.addEventListener("input", () => {
    const input = nameInputElement.value;
    
    const disabled = disableSubmit(IsEmpty(input));
    errorElement.textContent = disabled ? "Enter something!" : "";
})

// FORM: submission; definitely valid input if they let you submit!
formElement.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = nameInputElement.value;
    
    const recipes = await GetImportedRecipes(input);
    console.log(recipes);

    RenderAllRecipes(recipes);
})

// see domain to see recipes item
const RenderAllRecipes = (recipes) => {
    resultsContainerElement.replaceChildren();

    recipes.forEach(r => {
        resultsContainerElement.appendChild(MakeRecipeCard(r));
    })
};

// listen to buttonClicked event to pass info
const MakeRecipeCard = (recipe) => {
    const cardElement = document.createElement("figure");
    cardElement.classList.add("recipe-card");

    const imgElement = document.createElement("img");
    imgElement.classList.add("recipe-image");
    imgElement.setAttribute("src", recipe.img);

    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.classList.add("recipe-contents");

    const aElement = document.createElement("a");
    aElement.classList.add("recipe-name");
    aElement.setAttribute("href", recipe.url);
    aElement.setAttribute("target", "_blank")
    aElement.textContent = recipe.name;

    const buttonElement = document.createElement("button");
    buttonElement.classList.add("recipe-import");
    buttonElement.textContent = "Import";

    buttonElement.addEventListener("click", (e) => {
        // add this recipe to pendingRecipes.format it for pendingRecipes
        console.log(`Added ${recipe.name} to Pending Recipes`);
    });

    figcaptionElement.appendChild(aElement);
    figcaptionElement.appendChild(buttonElement);

    cardElement.appendChild(imgElement);
    cardElement.appendChild(figcaptionElement);

    return cardElement;
}