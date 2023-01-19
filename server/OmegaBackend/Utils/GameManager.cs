using Microsoft.AspNetCore.SignalR;
using OmegaBackend.Hubs;

namespace OmegaBackend.Utils;

public class GameManager
{
    private GameCache _gameCache;
    private Matchmaker _matchmaker;
    private IServiceProvider _serviceProvider;

    private IHubContext<OmegaHub> OmegaHub => _serviceProvider.GetRequiredService<IHubContext<OmegaHub>>();

    public GameManager(IServiceProvider serviceProvider)
    {
        _gameCache = new GameCache();
        _matchmaker = new Matchmaker(MatchCreated);
        _serviceProvider = serviceProvider;
    }

    public void EnqueuePlayer(Player player)
    {
        _matchmaker.EnqueuePlayer(player);
    }
    
    public Guid CreateGame(Player player1, Player player2)
    {
        var game = new Game(Guid.NewGuid(), player1, player2);
        return game.Id;
    }

    public (Guid, bool) JoinPlayerToGame(Player player, Guid gameId)
    {
        var game = _gameCache.GetGame(gameId);
        game.PlayerJoined(player);
        return (game.Id, game.State == Game.GameState.Active);
    }

    private void MatchCreated(Player player1, Player player2)
    {
        var gameId = CreateGame(player1, player2).ToString();
        Task.WaitAll(
            OmegaHub.Groups.AddToGroupAsync(player1.ConnectionId, gameId),
            OmegaHub.Groups.AddToGroupAsync(player1.ConnectionId, gameId));
        OmegaHub.Clients.Group(gameId).SendAsync("gameCreated", gameId).Wait();
    }
}
