
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class ProductsController : ControllerBase
	{
		//Using underscore when naming the var of private 
		private readonly StoreContext _context;
		public ProductsController(StoreContext context)
		{
			this._context = context;
		}
		
		//Take the list of product 
		//Using async to make website dont block thread when query the db
		[HttpGet] 
		public async Task<ActionResult<List<Product>>> GetListProducts() 
		{
			return await _context.Products.ToListAsync();
		}
		
		[HttpGet("{id}")]
	 	public async Task<ActionResult<Product>> GetProduct(int id)
		{
			return await _context.Products.FindAsync(id);
		}
	}
}