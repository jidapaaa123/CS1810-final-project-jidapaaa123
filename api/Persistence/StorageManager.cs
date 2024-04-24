using System.Text;
using SQLite;
namespace Persistence;

/// <summary>
/// Not account-based. Only keeps MY data
/// </summary>
public class StorageManager
{
    private SQLiteConnection connection { get; }

    public StorageManager()
    {
        connection = new SQLiteConnection("storage.db");
        connection.CreateTable<Ingredient>();
        connection.CreateTable<Recipe>();
    }

    /// <summary>
    /// Used for adding a recipe - List<string> into a single string of ingredients
    /// </summary>
    /// <param name="list"></param>
    /// <returns></returns>
    public static string StringifyIngredients(IEnumerable<string>? list)
    {

        if (list is null || !list.Any())
        {
            return "";
        }

        StringBuilder builder = new();
        foreach (var ingredient in list)
        {
            builder.Append(ingredient + ",");
        }
        string str = builder.ToString().TrimEnd(','); // Ex: salt,pepper,paprika instead of salt,pepper,paprika,

        return str;
    }

    // public static IEnumerable<Ingredient> ObjectifyIngredients(string str)
    // {
    //     List<Ingredient> list = new();
    //     string[] ingredients = str.Split(',');

    //     foreach (var ingredient in ingredients)
    //     {
    //         list.Add(new Ingredient() { Name = ingredient });
    //     }

    //     return list;
    // }

    public void AddRecipe(Recipe recipe)
    {
        connection.Insert(recipe);
    }

    public void AddIngredient(Ingredient ingredient)
    {
        throw new NotImplementedException();
    }

    public void RemoveRecipe(Recipe recipe)
    {
        throw new NotImplementedException();
    }

    public void RemoveIngredient(Ingredient ingredient)
    {
        throw new NotImplementedException();
    }

    public Recipe GetRecipe(string id)
    {
        throw new NotImplementedException();
    }

    public IEnumerable<Recipe> GetAllRecipes()
    {
        return connection.Table<Recipe>();
    }

    public void UpdateRecipe(Recipe recipe)
    {
        throw new NotImplementedException();
    }

    public bool HasIngredient(string name)
    {
        throw new NotImplementedException();
    }

    public bool HasRecipe(string id)
    {
        throw new NotImplementedException();
    }

    public void ResetIngredients()
    {
        connection.DeleteAll<Ingredient>();
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
        Ingredient? ingredient = connection.Find<Ingredient>(i => i.Name == name);

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