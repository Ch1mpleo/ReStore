
using System.Runtime;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
	public class ProductsController : BaseApiController
	{
		//Using underscore when naming the private variables
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
			//Add thêm error handling khi product ko có trong db
			var product = await _context.Products.FindAsync(id);
			if (product == null) return NotFound();
			return product; 
		}
		
		
		
		
		
		
	}
}