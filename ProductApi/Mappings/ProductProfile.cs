using AutoMapper;
using ProductApi.Models;
using ProductApi.DTOs;

namespace ProductApi.Mappings;

public class ProductProfile : Profile
{
    public ProductProfile()
    {
        CreateMap<Product, ProductDto>();
        CreateMap<ProductCreateDto, Product>();
    }
}
