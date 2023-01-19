namespace OmegaBackend.Utils;

public class Player
{
    public enum PlayerState
    {
        None,
        Searching,
        InGame
    }

    public enum PlayerNumber
    {
        PlayerOne,
        PlayerTwo
    }
    
    public Guid Id { get; set; }
    public string ConnectionId { get; set; }
    public int Elo { get; set; }
    public PlayerState State { get; set; }

    public Player(Guid id, string connectionId)
    {
        Id = id;
    }
}
