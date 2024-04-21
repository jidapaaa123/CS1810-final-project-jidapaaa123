
// placeholder return for now
export const GetImportedRecipes = async (searchWord) => {
    const recipes = [];
    // name, img, url to recipe. the rest? user's work. lol
    const recipe1 = {
        name: "Orange Chicken",
        img: "/layout/importPage.png",
        url: "https://snow.edu", // i told you it's placeholder!!!
    };
    const recipe2 = {
        name: "Red Chicken",
        img: "/layout/importPage.png",
        url: "https://snow.edu", // i told you it's placeholder!!!   
    }

    for (const i of "12345") // loops 5 times :D
    {
        recipes.push(recipe1);
        recipes.push(recipe2);
    }

    return recipes; // should be 10 items!
};

export const IsEmpty = (string) => {
    return string === null || string === undefined || string.Trim() == "";
}