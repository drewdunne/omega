using Microsoft.AspNetCore.SignalR;
using OmegaBackend.Hubs;
using OmegaBackend.Models;

namespace OmegaBackend.Utils;

public class GameManager
{
    private GameCache _gameCache;
    private Matchmaker _matchmaker;
    private IServiceProvider _serviceProvider;
    private PlayerManager _playerManager;

    private IHubContext<OmegaHub> OmegaHub =>
        _serviceProvider.GetRequiredService<IHubContext<OmegaHub>>();

    public GameManager(IServiceProvider serviceProvider,
        PlayerManager playerManager)
    {
        _gameCache = new GameCache();
        _matchmaker = new Matchmaker(MatchCreated);
        _serviceProvider = serviceProvider;
        _playerManager = playerManager;
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
        player1.PlayerNumber = PlayerNumber.PlayerOne;
        player2.PlayerNumber = PlayerNumber.PlayerTwo;

        var gameId = CreateGame(player1, player2).ToString();
        var tasks = new List<Task>
        {
            OmegaHub.Groups.AddToGroupAsync(player1.ConnectionId, gameId),
            OmegaHub.Groups.AddToGroupAsync(player2.ConnectionId, gameId),
            OmegaHub.Clients.Client(player1.ConnectionId).SendAsync("gameFound",
                new GameFoundNotification
                {
                    GameId = gameId, PlayerNumber = (int)player1.PlayerNumber
                }),
            OmegaHub.Clients.Client(player2.ConnectionId).SendAsync("gameFound",
                new GameFoundNotification
                {
                    GameId = gameId, PlayerNumber = (int)player2.PlayerNumber
                })
        };

        Task.WaitAll(tasks.ToArray());
    }

    public void PlayerConnectionDropped(string playerConnectionId)
    {
        var player = _playerManager.GetPlayerByConnectionId(playerConnectionId);

        switch (player.State)
        {
            case Player.PlayerState.Searching:
                // TODO: Not ideal that we're not just removing them from queue
                player.State = Player.PlayerState.DroppedConnection;
                break;
            case Player.PlayerState.InGame:
            {
                var game = player.Game;
                _gameCache.RemoveGame(game.Id);
                var opposingPlayer = game.GetOpposingPlayer(player);
                var result = player.PlayerNumber switch
                {
                    PlayerNumber.PlayerOne => GameResult.Player1Quit,
                    PlayerNumber.PlayerTwo => GameResult.Player2Quit,
                    _ => throw new ArgumentOutOfRangeException()
                };

                OmegaHub.Clients.Client(opposingPlayer.ConnectionId).SendAsync(
                    "gameOver",
                    new GameOverNotification
                        { GameId = game.Id.ToString(), GameResult = result });
                break;
            }
            case Player.PlayerState.DroppedConnection:
            case Player.PlayerState.None:
            default:
                break;
        }

        _playerManager.RemovePlayer(player.Id);
    }
}
