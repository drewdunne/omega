using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using OmegaBackend.Models;

namespace OmegaBackend.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class OmegaController : ControllerBase
{
    [HttpPost]
    public HelloOutputModel Hello(HelloInputModel input)
    {
        return new HelloOutputModel
        {
            Result = false,
            ResultStr = input.PrintString
        };
    }
    
    [HttpPost]
    public MessageModel SendMessage(MessageModel input)
    {
        return input;
    }
    
}
