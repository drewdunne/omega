using System.Collections.Concurrent;

namespace OmegaBackend.Utils;

public class PlayerManager
{
    private ConcurrentDictionary<Guid, Player> _players = new();
    private ConcurrentDictionary<string, Player> _playerConnectionIdMap = new();

    public Guid CreatePlayer(string connectionId)
    {
        var guid = Guid.NewGuid();
        var player = new Player(guid, connectionId);
        _players.TryAdd(guid, player);
        _playerConnectionIdMap.TryAdd(connectionId, player);
        return guid;
    }

    public Player GetPlayer(Guid playerId)
    {
        _players.TryGetValue(playerId, out var player);
        return player;
    }

    public Player GetPlayerByConnectionId(string connectionId)
    {
        _playerConnectionIdMap.TryGetValue(connectionId, out var player);
        return player;
    }

    public void RemovePlayer(Guid playerId)
    {
        _players.Remove(playerId, out _);
    }
}
