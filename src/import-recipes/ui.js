import { GetImportedRecipes } from "./domain.js";

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
    }
    else
    {
        submitButton.disabled = false;
        submitButton.classList.remove("disabled");
    }
};
// PAGE LOAD: disable search button
disableSubmit(true);

// FORM: validate input
formElement.addEventListener("input", (e) => {

})

// FORM: submission
formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    
})

// ask domain to fetch recipesList
const RenderAllRecipes = (recipes) => {

};

const MakeRecipeCard = (recipe) => {

}

console.log(submitButton.disabled == true)