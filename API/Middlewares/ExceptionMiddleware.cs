using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;

namespace API.Middlewares
{
	//Đây là 1 middleware -> sau khi viết xong phải vào program.cs để add vào 
	//Trong Request pipeline, middleware là tác vụ nằm gần cuối
	public class ExceptionMiddleware
	{
		/** Trong class middleware phải có ít nhất 1 tham số (param) 
		là RequestDelegate => Thực chất là gọi tới middleware kế tiếp (ứng dụng delegate)*/

		//ILogger để in ra log exception khi bắt được lỗi
		//IHostEnvironmnet để check xem đang host ở production hay dev mode


		private readonly RequestDelegate _next;
		private readonly ILogger<ExceptionMiddleware> _logger;
		private readonly IHostEnvironment _env;

		public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
		{
			_next = next;
			_logger = logger;
			_env = env;
		}


		public async Task InvokeAsync(HttpContext context)
		{
			try
			{
				//Call tới cái middleware tiếp theo nếu ko catch được lỗi
				await _next(context);
			}
			catch (Exception ex)
			{
				//In ra message -> xuất ra dạng json -> với status code = 500
				_logger.LogError(ex, ex.Message);
				context.Response.ContentType = "application/json";
				context.Response.StatusCode = 500;

				//Tạo 1 object là ProblemDetails: bên trong chứa thông tin của lỗi
				var Response = new ProblemDetails
				{
					Status = 500,
					Detail = _env.IsDevelopment() ? ex.StackTrace?.ToString() : null,
					Title = ex.Message
				};

				var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
				
				//Convert 1 value thành chuỗi json
				var json = JsonSerializer.Serialize(Response, options);
				
				//Xuất ra chuỗi json đã convert
				//Sử dụng await ở đây để khi WriteAsync đang được viết sẽ ko bị ngắt bởi InvokeAsync mà phải đợi cho xong hết mới được tiếp tục
				await context.Response.WriteAsync(json);
			}


		}
	}
}