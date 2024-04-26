using Persistence;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();

var app = builder.Build();
app.UseCors(
    options =>
        options
        .AllowAnyHeader()
        .AllowAnyOrigin()
        .AllowAnyMethod()
);

StorageManager storage = new();

app.MapGet("/", () => "Note: for storage, C# turns some objects (like lists) into a single string. The client-side is responsible for turning them back into objects!");

app.MapGet("/newguid", () =>
{
    var guid = Guid.NewGuid();
    return new { guid };
});

app.MapPost("/ingredients/add", (PantryIngredientRequest ingredient) =>
{

});

app.MapPost("/recipes/add", (RecipeRequest request) =>
{
    Console.WriteLine(request.Ingredients.Count);
    Console.WriteLine(request.Ingredients[0].IsOptional);
    Console.WriteLine(request.Ingredients[0].Name);
    Console.WriteLine(request.Ingredients[0].Substitutes[0]);

    string ingredients = StorageManager.StringifyIngredients(request.Ingredients);
    Recipe recipe = new() { Id = request.Id, Name = request.Name, IsPending = request.IsPending, Image = request.Image, Ingredients = ingredients, Instructions = request.Instructions };
    storage.AddRecipe(recipe);

    Console.WriteLine("added!");
});
app.MapGet("/recipes/get", () =>
{
    var allRecipes = storage.GetAllRecipes();
    return new { allRecipes };
});
app.MapGet("/recipes/clear", () => storage.ResetRecipes());

app.Run();

public record PantryIngredientRequest(string Name);
public record RecipeRequest(string Id, string Name, bool IsPending, bool HasRequiredInfo, string Image, List<Ingredient> Ingredients, string Instructions);
