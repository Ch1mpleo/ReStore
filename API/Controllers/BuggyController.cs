using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
	public class BuggyController : BaseApiController
	{
		
		// Cần phải xem endpoint để web có thể phân biệt được
		[HttpGet("not-found")]
		public ActionResult GetNotFound() 
		{
			// Trả về lỗi 404
			return NotFound();
		}
		
		[HttpGet("bad-request")]
		public ActionResult GetBadRequest() 
		{
			// Trả về message lỗi
			return BadRequest(new ProblemDetails{Title = "This is bad request"});
		}
			
		[HttpGet("unauthorised")]
		public ActionResult GetUnauthorised() 
		{
			return Unauthorized();
		}
		
		[HttpGet("validation-error")]
		public ActionResult GetValidationError() 
		{
			// Trả về lỗi validation (vd: những field mà người dùng cần nhập mà chưa nhập xong)
			ModelState.AddModelError("Problem 1", "This is the first error");
			ModelState.AddModelError("Problem 2", "This is the second error");
			return ValidationProblem();
		}
		
		[HttpGet("server-error")]
		public ActionResult GetServerError() 
		{
			throw new Exception("This is a server error");
		}
	}
}