using ProductApi.Models;

namespace ProductApi.Data
{
    public static class DbInitializer
    {
        public static void Seed(AppDbContext context)
        {
            // Avoid seeding if there are already products
            if (context.Products.Any())
                return;

            var products = new List<Product>
            {
                new Product { Name = "Sample Product 1", Price = 9.99m },
                new Product { Name = "Sample Product 2", Price = 19.99m },
                new Product { Name = "Sample Product 3", Price = 29.99m }
            };

            context.Products.AddRange(products);
            context.SaveChanges();
        }
    }
}
