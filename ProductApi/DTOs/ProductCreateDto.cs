using System.ComponentModel.DataAnnotations;

namespace ProductApi.DTOs;

public class ProductCreateDto
{
    [Required]
    public string Name { get; set; } = string.Empty;

    [Range(0.01, 10000)]
    public decimal Price { get; set; }
}
