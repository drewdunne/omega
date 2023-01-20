namespace OmegaBackend.Utils;

public class Game
{
    public enum GameState
    {
        WaitingForPlayers,
        Active,
    }

    private List<Player> _players = new();

    public GameState State { get; set; }

    public Guid Id { get; set; }

    public Game(Guid id, Player player1, Player player2)
    {
        Id = id;
        _players.Add(player1);
        _players.Add(player2);
        State = GameState.WaitingForPlayers;
    }

    public void PlayerJoined(Player joiningPlayer)
    {
        var p = _players.First(x => x == joiningPlayer);
        p.State = Player.PlayerState.InGame;
        p.Game = this;

        if (_players.All(x => x.State == Player.PlayerState.InGame))
        {
            State = GameState.Active;
        }
    }

    public Player GetOpposingPlayer(Player player)
    {
        return _players.First(x => x != player);
    }
}
