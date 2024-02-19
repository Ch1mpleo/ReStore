using Microsoft.AspNetCore.Mvc;

namespace API.Middlewares
{
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
				await _next(context);
			}
			catch (Exception ex)
			{
				//In ra message -> xuất ra dạng json -> với status code = 500
				_logger.LogError(ex, ex.Message);
				context.Response.ContentType = "application/json";
				context.Response.StatusCode = 500;
			}
			
			// var Response = new ProblemDetails 
			// {
			// 	Status = 500,
				
			// }
		}
	}
}