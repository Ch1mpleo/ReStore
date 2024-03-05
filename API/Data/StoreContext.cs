using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : DbContext
    {
        //Constructor
        public StoreContext(DbContextOptions options) : base(options)
        {
        }

        //Tạo DbSet để tương tác với database - DbSet tương ứng với table trong db
        public DbSet<Product> Products {get; set;}
        public DbSet<Basket> Baskets {get; set;}
        public DbSet<BasketItem> BasketItems {get; set;}
    }
}