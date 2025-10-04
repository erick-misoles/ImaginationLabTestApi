using Microsoft.AspNetCore.Mvc;
using ProductApi.Data;
using ProductApi.Models;
using ProductApi.DTOs;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace ProductApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IMapper _mapper;

    public ProductsController(AppDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetAll()
    {
        var products = await _context.Products.ToListAsync();
        return Ok(_mapper.Map<List<ProductDto>>(products));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductDto>> GetById(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return NotFound();
        return Ok(_mapper.Map<ProductDto>(product));
    }

    [HttpPost]
    public async Task<ActionResult<ProductDto>> Create(ProductCreateDto dto)
    {
        var product = _mapper.Map<Product>(dto);
        product.CreatedDate = DateTime.UtcNow;

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        var result = _mapper.Map<ProductDto>(product);
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, ProductCreateDto dto)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return NotFound();

        _mapper.Map(dto, product);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return NotFound();

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
