using SQLite;
namespace Persistence;

/// <summary>
/// Not account-based. Only keeps MY data
/// </summary>
public class StorageManager
{
    private SQLiteConnection connection {get;}

    public StorageManager()
    {
        connection = new SQLiteConnection("storage.db");
        connection.CreateTable<Ingredient>();
        connection.CreateTable<Recipe>();
    }

    public void AddRecipe(Recipe recipe)
    {
        throw new NotImplementedException();
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

    public void UpdateRecipe(Recipe recipe)
    {
        throw new NotImplementedException();
    }
}