using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
	public class BasketController : BaseApiController
	{

		//Using underscore when naming the private variables
		private readonly StoreContext _context;

		//tạo hàm constructor để inject StoreContext vào
		public BasketController(StoreContext context)
		{
			_context = context;

		}




		[HttpGet(Name = "GetBasket")]
		public async Task<ActionResult<BasketDTO>> GetBasket()
		{
			//Tách hàm RetrieveBasket ra để dễ test - hàm này để get basket của buyer
			var basket = await RetrieveBasket();
			if (basket == null) return NotFound();
			return MapBasketToDTO(basket);
		}



		[HttpPost] // api/basket?productId=1&quantity=5
		public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
		{
			// Logic xử lý
			//1. Get basket || Create basket if not exists + check validate
			var basket = await RetrieveBasket();
			if (basket == null) basket = CreateNewBasket(); //vì FirstOrDefaultAsync trả về null nếu không tìm thấy nên ta so sánh với null

			//2. Get product và check validate
			var product = await _context.Products.FindAsync(productId);
			if (product == null) return NotFound();

			//3. Add item to basket - gọi hàm đã làm bên Basket.cs
			basket.AddItem(product, quantity);

			/*4. Save Changes - vì SaveChangesAsync sẽ trả về 1 int số lần thay đổi trong db nên ta so sánh 
				với 0 để biết là đã thêm thành công chưa - với status code 201 là đã thêm thành công */
			var result = await _context.SaveChangesAsync() > 0;
			if (result) return CreatedAtRoute("GetBasket", MapBasketToDTO(basket)); 
			//CreatedAtRoute trả về status code 201 và location header chứa link đến resource mới tạo
			
			return BadRequest(new ProblemDetails { Title = "Problem occur when adding item to basket" });
		}



		[HttpDelete]
		public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
		{
			// Logic xử lý 
			// 1. Get basket || if not exists return 404
			var basket = await RetrieveBasket();
			if (basket == null) return NotFound();

			// 2. Remove basket item - reduce quantity 
			basket.RemoveItem(productId, quantity);

			// 3. Save Changes
			var result = await _context.SaveChangesAsync() > 0;
			if (result) return Ok();
			return BadRequest(new ProblemDetails
			{
				Title = "Problem occur when removing item from basket"
			});
		}

		//Tách hàm RetrieveBasket này ra để các function khác có thể dùng ké
		//Hàm này để get basket của buyer
		private async Task<Basket> RetrieveBasket()
		{
			//Lấy buyerId từ cookie để xem buyer đó đã cho những gì vào basket
			//Rút ngắn lại code
			return await _context.Baskets
						.Include(i => i.Items)                                              //Include để lấy cả thông tin của Items
						.ThenInclude(p => p.Product)                                        //ThenInclude để lấy cả thông tin của Product
						.FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]); //Lấy basket của buyer đó nhưng phải convert sang int vì buyerId lưu trong cookie là string

		}

		private Basket CreateNewBasket()
		{
			//Sử dụng Guid để tạo buyerId random - gobal unique identifier
			var buyerId = Guid.NewGuid().ToString();
			var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
			Response.Cookies.Append("buyerId", buyerId, cookieOptions);
			var basket = new Basket { BuyerId = buyerId };
			_context.Baskets.Add(basket);           //Đưa cho Entity Framework biết là basket này sẽ được thêm vào db
			return basket;
		}

		private static BasketDTO MapBasketToDTO(Basket basket)
		{
			return new BasketDTO
			{
				Id = basket.Id,
				BuyerId = basket.BuyerId,
				Items = basket.Items.Select(items => new BasketItemDTO
				{
					ProductId = items.Product.Id,
					Name = items.Product.Name,
					Description = items.Product.Description,
					Price = items.Product.Price,
					PictureUrl = items.Product.PictureUrl,
					Type = items.Product.Type,
					Brand = items.Product.Brand,
					Quantity = items.Quantity       //Lấy quantity của BasketItem - ko phải của Product
				}).ToList() //Mapping từ List<BasketItem> => List<BasketItemDTO> - giống với DTO học Java
			};
		}
	}
}