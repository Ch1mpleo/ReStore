using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
	public class Basket
	{
		public int BasketId { get; set; }
		public int BuyerId { get; set; }
		public List<BasketItem> Items { get; set; } = new();
		// Initializer List để tránh null exception
		
		//Hàm add item vào basket có 2 tham số truyền vào là product và quantity
		public void AddItems(Product product, int quantity) {
			//Kiểm tra xem product đã có trong basket chưa nếu chưa thì add vào
			//Đây là lý do phải khởi tạo list ở trên - vì nếu ko khởi tạo thì sẽ bị null exception 
			//(ta chỉ so sánh được khi nó rỗng hoặc có tồn tại chứ ko phải null)
			if(Items.All(Items => Items.Product.Id != product.Id)) {
				Items.Add(new BasketItem {
					Product = product,
					Quantity = quantity
				});
			}
			// else {
			// 	Items.Find(Items => Items.Product.Id == product.Id).Quantity += quantity;
			// }
			
			var existingItem = Items.FirstOrDefault(Items => Items.Product.Id == product.Id);
			if (existingItem != null) existingItem.Quantity += quantity;
		}
		
		
		
		
	}
}

