using System.Text;
using SQLite;
namespace Persistence;

public record Ingredient(string Name, bool IsOptional, List<string> Substitutes);

/// <summary>
/// Not account-based. Only keeps MY data
/// </summary>
public class StorageManager
{
    private SQLiteConnection connection { get; }

    public StorageManager()
    {
        connection = new SQLiteConnection("/app/data/storage.db");
        connection.CreateTable<PantryIngredient>();
        connection.CreateTable<Recipe>();
    }

    /// <summary>
    /// Used for adding a recipe - into a single string of ingredients
    /// </summary>
    /// <param name="list"></param>
    /// <returns>Ex: "soy sauce(salt/fish sauce),@chili,pepper(paprika)" = soy sauce and pepper have substitutes, chili is optional</returns>
    public static string StringifyIngredients(IEnumerable<Ingredient>? list)
    {
        if (list is null || !list.Any())
        {
            return "";
        }

        StringBuilder builder = new();
        foreach (var ingredient in list)
        {
            string current = ingredient.IsOptional ? "@" : "";
            current += ingredient.Name;

            if (ingredient.Substitutes.Count != 0)
            {
                current += "(";

                foreach (var sub in ingredient.Substitutes)
                {
                    current += $"{sub}/";
                }

                current = current.TrimEnd('/');
                current += ")";
            }

            builder.Append($"{current},");
        }
        string str = builder.ToString().TrimEnd(',');

        return str;
    }

    public void AddRecipe(Recipe recipe)
    {
        connection.Insert(recipe);
    }

    /// <summary>
    /// Returns bool: "was any ingredient added?" / Will not add duplicates
    /// </summary>
    /// <param name="ingredient"></param>
    /// <returns></returns>
    /// <exception cref="NotImplementedException"></exception>
    public bool AddIngredient(PantryIngredientRequest request)
    {
        if (HasIngredient(request.Name))
        {
            return false;
        }

        connection.Insert(new PantryIngredient() { Name = request.Name });
        return true;
    }

    public Recipe GetRecipe(string id)
    {
        throw new NotImplementedException();
    }

    /// <summary>
    /// Although it's stored with an Id for storage purposes, it's only use is the names
    /// </summary>
    /// <returns></returns>
    public IEnumerable<string> GetPantryIngredientNames()
    {
        return connection.Table<PantryIngredient>().Select(i => i.Name);
    }

    /// <summary>
    /// Format the Ingredients string yourself! Lol
    /// </summary>
    /// <returns></returns>
    public IEnumerable<Recipe> GetAllRecipes()
    {
        return connection.Table<Recipe>();
    }

    public void UpdateRecipe(Recipe recipe)
    {
        connection.Update(recipe);
    }

    public bool HasIngredient(string name)
    {
        return connection.Table<PantryIngredient>().Any(i => i.Name == name);
    }

    public bool HasRecipe(string id)
    {
        throw new NotImplementedException();
    }

    public void ResetIngredients()
    {
        connection.DeleteAll<PantryIngredient>();
    }

    public void ResetRecipes()
    {
        connection.DeleteAll<Recipe>();
    }

    /// <summary>
    /// Deletes ingredient of the specified name. Returns true if an object was found and deleted
    /// </summary>
    /// <param name="name"></param>
    /// <returns></returns>
    public bool DeleteIngredient(string name)
    {
        // there should be no duplicates, anyway
        PantryIngredient? ingredient = connection.Find<PantryIngredient>(i => i.Name == name);

        if (ingredient is null)
        {
            return false;
        }
        else
        {
            connection.Delete(ingredient);
            return true;
        }
    }

    /// <summary>
    /// Deletes recipe of the specified id. Returns true if an object was found and deleted
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public bool DeleteRecipe(string id)
    {
        Recipe? recipe = connection.Find<Recipe>(r => r.Id == id);

        if (recipe is null)
        {
            return false;
        }
        else
        {
            connection.Delete(recipe);
            return true;
        }
    }
}