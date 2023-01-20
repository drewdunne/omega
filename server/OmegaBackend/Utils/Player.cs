namespace OmegaBackend.Utils;

public enum PlayerNumber
{
    PlayerOne,
    PlayerTwo
}

public class Player
{
    public enum PlayerState
    {
        None,
        Searching,
        DroppedConnection,
        InGame
    }
    
    public Guid Id { get; set; }
    public string ConnectionId { get; set; }
    public int Elo { get; set; }
    public Game Game { get; set; }
    
    public PlayerState State { get; set; } = PlayerState.None;

    public PlayerNumber PlayerNumber { get; set; }

    public Player(Guid id, string connectionId)
    {
        Id = id;
        ConnectionId = connectionId;
    }
}
