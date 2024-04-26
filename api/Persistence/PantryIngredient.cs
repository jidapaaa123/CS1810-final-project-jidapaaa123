using SQLite;

namespace Persistence;

public class PantryIngredient
{
    [PrimaryKey, AutoIncrement]
    public int Id { get; set; }
    public string? Name { get; set; }
}