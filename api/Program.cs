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

app.MapPost("/ingredients/add", (PantryIngredientRequest request) =>
{
    bool isAdded = storage.AddIngredient(request);
});

app.MapGet("/ingredients/get", () =>
{
    var allIngredients = storage.GetPantryIngredientNames();
    return new { allIngredients };
});

app.MapGet("/ingredients/clear", () => storage.ResetIngredients());

app.MapPost("/ingredients/delete", (PantryIngredientRequest request) => {
    bool isDeleted = storage.DeleteIngredient(request.Name);
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

app.MapPost("/recipes/delete", (RecipeRequest request) =>
{
    var id = request.Id;
    bool isDeleted = storage.DeleteRecipe(id);
});


app.MapPost("/recipes/update", (RecipeRequest request) =>
{
    string ingredients = StorageManager.StringifyIngredients(request.Ingredients);
    Recipe recipe = new() { Id = request.Id, Name = request.Name, IsPending = request.IsPending, HasRequiredInfo = request.HasRequiredInfo, Image = request.Image, Ingredients = ingredients, Instructions = request.Instructions };
    storage.UpdateRecipe(recipe);
});

app.Run();

public record PantryIngredientRequest(string Name);
public record RecipeRequest(string Id, string Name, bool IsPending, bool HasRequiredInfo, string Image, List<Ingredient> Ingredients, string Instructions);
