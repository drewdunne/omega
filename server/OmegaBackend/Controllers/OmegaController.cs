using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using OmegaBackend.Hubs;
using OmegaBackend.Models;
using OmegaBackend.Utils;

namespace OmegaBackend.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class OmegaController : ControllerBase
{
    private IHubContext<OmegaHub> _hubContext;
    private GameManager _gameManager;
    private PlayerManager _playerManager;
    
    public OmegaController(GameManager gameManager, PlayerManager playerManager, IHubContext<OmegaHub> hubContext)
    {
        _playerManager = playerManager;
        _gameManager = gameManager;
        _hubContext = hubContext;
    }
    
    [HttpGet]
    public BootstrapOutput Bootstrap(string connectionId)
    {
        var newPlayerId = _playerManager.CreatePlayer(connectionId);
        return new BootstrapOutput
        {
            PlayerId = newPlayerId.ToString()
        };
    }
    
    [HttpPost]
    public void FindGame(FindGameInput input)
    {
        _gameManager.EnqueuePlayer(_playerManager.GetPlayer(Guid.Parse(input.PlayerId)));
    }
    
    [HttpPost]
    public async Task JoinGame(JoinGameInput input)
    {
        var player = _playerManager.GetPlayer(Guid.Parse(input.PlayerId));
        var (gameId, gameStarted) = _gameManager.JoinPlayerToGame(player, Guid.Parse(input.GameId));

        if (gameStarted)
        {
            await _hubContext.Clients.Group(gameId.ToString())
                .SendAsync("gameStarted", gameId);
        }
    }

    [HttpPost]
    public void DoTurn(DoTurnInput input)
    {
    }
    

    [HttpPost]
    public MessageModel SendMessage(MessageModel input)
    {
        _hubContext.Clients.All.SendAsync("ReceiveMessage", input.Message);
        return input;
    }
}
