using System.Collections.Concurrent;

namespace OmegaBackend.Utils;

public class Matchmaker
{
    private const int UpdatePeriodInMs = 1000;
    private readonly ConcurrentQueue<Player> _searchingPlayers = new();
    private readonly Action<Player, Player> _matchMadeCallback;
    
    // ReSharper disable once NotAccessedField.Local
    // Timer doesn't need to be accessed, it's calling the Tick method periodically
    private readonly Timer _timer;
    
    public Matchmaker(Action<Player, Player> matchMadeCallback)
    {
        _timer = new Timer(_ => Tick(), null, 0, UpdatePeriodInMs);
        _matchMadeCallback = matchMadeCallback;
    }
    
    public void EnqueuePlayer(Player player)
    {
        _searchingPlayers.Enqueue(player);
    }

    private void Tick()
    {
        if (_searchingPlayers.Count < 2)
        {
            return;
        }
        
        _searchingPlayers.TryDequeue(out var player1);
        if (player1 == null || player1.State == Player.PlayerState.DroppedConnection)
        {
            return;
        }
        
        _searchingPlayers.TryDequeue(out var player2);
        if (player2 == null || player2.State == Player.PlayerState.DroppedConnection)
        {
            // TODO: this isn't ideal, we're putting a player at the back of the queue for no fault of their own.
            _searchingPlayers.Enqueue(player1);
            return;
        }

        _matchMadeCallback(player1, player2);
    }
}
