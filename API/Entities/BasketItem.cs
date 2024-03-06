using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
	//Tạo bảng BasketItems trong db với các cột Id, Quantity, ProductId, BasketId
	//Và tạo các foreign key ProductId, BasketId
	//Đây gọi là data annotation - giúp map các thuộc tính trong cột vào db  
	[Table("BasketItems")]
	public class BasketItem
	{
		public int Id { get; set; }
		public int Quantity { get; set; }

		//Navigation property - giống như foreign key trong db
		
		//ForeignKey("ProductId") - Tạo foreign key ProductId
		public int ProductId { get; set; }
		public Product Product { get; set; }
		
		//ForeignKey("BasketId") - Tạo foreign key BasketId
		public int BasketId { get; set; }
		public Basket Basket { get; set; }

	}
}