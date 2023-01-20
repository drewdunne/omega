using Microsoft.AspNetCore.SignalR;
using OmegaBackend.Utils;

namespace OmegaBackend.Hubs;

public class OmegaHub : Hub
{
    private GameManager _gameManager;
    
    public OmegaHub(GameManager gameManager)
    {
        _gameManager = gameManager;
    }

    public override Task OnDisconnectedAsync(Exception? exception)
    {
        _gameManager.PlayerConnectionDropped(Context.ConnectionId);
        return base.OnDisconnectedAsync(exception);
    }
}
