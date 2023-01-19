namespace OmegaBackend.Models;

public class FindGameInput
{
    public string PlayerId { get; set; }
    public int Elo { get; set; }
}
