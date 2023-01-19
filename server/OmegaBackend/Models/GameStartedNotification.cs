using OmegaBackend.Utils;

namespace OmegaBackend.Models;

public class GameStartedNotification
{
    public int PlayerNumber { get; set; }
    public string GameId { get; set; } = string.Empty;
}
