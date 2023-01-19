namespace OmegaBackend.Models;

public class GameEndedNotification
{
    public string GameId { get; set; } = string.Empty;
    public GameResult GameResult { get; set; }
}
