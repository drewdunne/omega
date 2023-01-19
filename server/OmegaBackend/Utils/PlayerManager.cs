using System.Collections.Concurrent;

namespace OmegaBackend.Utils;

public class PlayerManager
{
    private ConcurrentDictionary<Guid, Player> _players = new();

    public Guid CreatePlayer(string connectionId)
    {
        var guid = Guid.NewGuid();
        _players.TryAdd(guid, new Player(guid, connectionId));
        return guid;
    }

    public Player GetPlayer(Guid playerId)
    {
        _players.TryGetValue(playerId, out var player);
        return player;
    }
}
