namespace OmegaBackend.Models;

public class GameOverNotification
{
    public string GameId { get; set; } = string.Empty;
    public GameResult GameResult { get; set; }
}
