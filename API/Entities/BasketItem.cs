using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
	public class BasketItem
	{
		public int Id { get; set; }
		public int Quantity { get; set; }
		
		//Navigation property - Giống với foreign key trong db
		public int ProductId { get; set; }
		public Product Product { get; set; }
		
		
	}
}