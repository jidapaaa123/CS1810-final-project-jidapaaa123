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
    throw new NotImplementedException();
});

app.MapGet("/ingredients/get", () =>
{
    throw new NotImplementedException();
});

app.MapPost("/recipes/add", (RecipeRequest request) =>
{
    string ingredients = StorageManager.StringifyIngredients(request.Ingredients);
    Recipe recipe = new() { Id = request.Id, Name = request.Name, IsPending = request.IsPending, HasRequiredInfo = request.HasRequiredInfo, Image = request.Image, Ingredients = ingredients, Instructions = request.Instructions };
    storage.AddRecipe(recipe);
});
app.MapGet("/recipes/get", () =>
{
    var allRecipes = storage.GetAllRecipes();
    return new { allRecipes };
});
app.MapGet("/recipes/clear", () => storage.ResetRecipes());
app.MapPost("/recipes/update", (RecipeRequest request) => {
    string ingredients = StorageManager.StringifyIngredients(request.Ingredients);
    Recipe recipe = new() { Id = request.Id, Name = request.Name, IsPending = request.IsPending, HasRequiredInfo = request.HasRequiredInfo, Image = request.Image, Ingredients = ingredients, Instructions = request.Instructions };
    storage.UpdateRecipe(recipe);
});

app.Run();

public record PantryIngredientRequest(string Name);
public record RecipeRequest(string Id, string Name, bool IsPending, bool HasRequiredInfo, string Image, List<Ingredient> Ingredients, string Instructions);
