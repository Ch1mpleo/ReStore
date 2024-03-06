using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
	public class BasketItemDTO
	{
		public int ProductId { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public long Price { get; set; }
		public string PictureUrl { get; set; }
		public string Type { get; set; }
		public string Brand { get; set; }
		public int Quantity { get; set; }
	}
}