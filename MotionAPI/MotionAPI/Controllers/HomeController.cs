using Microsoft.AspNetCore.Mvc;

namespace MotionAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController: ControllerBase
    {
        [HttpGet]
        public string Index()
        {
            return "Hello form HomeController";
        }
    }
}
