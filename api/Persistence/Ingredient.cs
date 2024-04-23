using SQLite;

namespace Persistence;

public class Ingredient
{
    [PrimaryKey, AutoIncrement]
    public int Id { get; set; }
    public string? Name { get; set; }
}