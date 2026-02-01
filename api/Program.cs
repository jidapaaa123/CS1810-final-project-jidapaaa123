using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;
using Persistence;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();

var apiKey = builder.Configuration["Cloudinary:ApiKey"];
var apiSecret = builder.Configuration["Cloudinary:ApiSecret"];
var cloudName = builder.Configuration["Cloudinary:CloudName"];

Account account = new()
{
    ApiKey = apiKey,
    ApiSecret = apiSecret,
    Cloud = cloudName
};

builder.Services.AddSingleton(new Cloudinary(account));

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

app.MapPost("/ingredients/delete", (PantryIngredientRequest request) =>
{
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


app.MapPost("/recipes/update", async ([FromServices] Cloudinary cloudinary, HttpContext context) =>
{
    var form = await context.Request.ReadFormAsync();

    var id = form["id"];
    var name = form["name"];
    var isPending = bool.TryParse(form["isPending"], out bool parsedIsPending) ? parsedIsPending : false;
    var hasRequiredInfo =bool.TryParse(form["hasRequiredInfo"], out bool parsedHasRequiredInfo) ? parsedHasRequiredInfo : false;
    var instructions = form["instructions"];
    var ingredientsRaw = form["ingredients"]; // comma-separated string
    var currentImageUrl = form["image"];      // existing URL (if no new file)

    var file = form.Files.GetFile("imageFile");
    string finalImageUrl = currentImageUrl;
    if (file != null)
    {
        try
        {
            using var stream = file.OpenReadStream(); // feeling risky so I'm not restricting o_0
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(file.FileName, stream),
                Folder = "old_recipe_tracker_images",
                DisplayName = file.FileName
            };

            var result = await cloudinary.UploadAsync(uploadParams);
            finalImageUrl = result.SecureUrl.ToString();
        } catch (Exception ex)
        {
            Console.WriteLine($"Error uploading image: {ex.Message}");
            finalImageUrl = currentImageUrl; 
        }
    }

    Recipe recipe = new() 
    { 
        Id = id, 
        Name = name, 
        Image = finalImageUrl, 
        Ingredients = ingredientsRaw, 
        Instructions = instructions,
        IsPending = isPending,
        HasRequiredInfo = hasRequiredInfo
    };

    storage.UpdateRecipe(recipe);
});

app.Run();

public record PantryIngredientRequest(string Name);
public record RecipeRequest(string Id, string Name, bool IsPending, bool HasRequiredInfo, string Image, List<Ingredient> Ingredients, string Instructions);
