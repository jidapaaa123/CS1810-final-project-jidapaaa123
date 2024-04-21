
// because GUID doesnt want to work from the api...
export const RandomString = (length = 10) => {
    const string = "ABCDEFG123456789abcdefg";

    let randomString = "";
    for (let i = 0; i < length; i++)
    {
        const rand = Math.floor(Math.random() * string.length);
        randomString += string[rand];
        
    }

    console.log(randomString);
    return randomString;
}

// TODO - placeholder get pendings
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
export const GetPendingRecipes = async () => {
    const recipes = [];
    for (let i = 0; i < 5; i++)
    {
        recipes.push({
            id: RandomString(),
            name: "Color Chicken",
            isPending: true,
            hasRequiredInfo: false,
            img: "/layout/pendingPage.png",
            ingredients: ["milk", "butter", "egg"],
            instructions: "Put the chicken in a paint bucket",
        });
    }

    return recipes;
}