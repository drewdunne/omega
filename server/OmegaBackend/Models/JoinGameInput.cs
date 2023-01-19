namespace OmegaBackend.Models;

public class JoinGameInput
{
    public string PlayerId { get; set; }
    public string GameId { get; set; } = string.Empty;
}
