using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public int BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new();

        //Hàm để add product vào basket 
        public void AddItem(Product product, int quantity) {
            //Kiểm tra xem product đã có trong basket chưa - Sử dụng LINQ
            if (Items.All(item => item.ProductId != product.Id)) {
                Items.Add(new BasketItem {
                    Product = product,
                    Quantity = quantity
                });
            }
            // Nếu product đã có trong basket thì tăng số lượng lên
            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);
            if (existingItem != null) {
                existingItem.Quantity += quantity;
            }
        }

        //Hàm để remove product khỏi basket
        public void RemoveItem(Product product, int quantity) {
            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);
            if (existingItem != null) {
                //Nếu số lượng còn lại trong basket lớn hơn số lượng muốn remove thì giảm số lượng
                if (existingItem.Quantity > quantity) {
                    existingItem.Quantity -= quantity;
                } else {
                    Items.Remove(existingItem);
                }
            }
        }
    }
}