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

app.MapGet("/newguid", () =>
{
    var guid = Guid.NewGuid();
    return new { guid };
});

app.MapPost("/ingredients/add", (IngredientRequest ingredient) =>
{

});

app.MapPost("/recipes/add", (RecipeRequest request) =>
{
    string ingredients = StorageManager.StringifyIngredients(request.Ingredients);
    Recipe recipe = new() { Id = request.Id, Name = request.Name, IsPending = request.IsPending, Image = request.Image, Ingredients = ingredients, Instructions = request.Instructions };
    storage.AddRecipe(recipe);
});
app.MapGet("/recipes/get", () =>
{
    var allRecipes = storage.GetAllRecipes();
    return new { allRecipes };
});

app.Run();

public record IngredientRequest(string Name);
public record RecipeRequest(string Id, string Name, bool IsPending, bool HasRequiredInfo, string Image, List<string> Ingredients, string Instructions);