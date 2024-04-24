using SQLite;
namespace Persistence;

/// <summary>
/// Storing image??
/// </summary>
public class Recipe
{
    [PrimaryKey]
    public string? Id { get; set; }
    public string? Name { get; set; }
    public bool IsPending { get; set; }
    public bool HasRequiredInfo { get; set; }

    /// <summary>
    /// As string? Public image link only
    /// </summary>
    public string? Image { get; set; }
    /// <summary>
    /// Separated by ","
    /// </summary>
    public string? Ingredients { get; set; }
    public string? Instructions { get; set; }
}