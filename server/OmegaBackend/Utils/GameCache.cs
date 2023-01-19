using System.Collections.Concurrent;
using System.Text.RegularExpressions;

namespace OmegaBackend.Utils;

public class GameCache
{
    private readonly ConcurrentDictionary<Guid, Game> _activeGames = new ConcurrentDictionary<Guid, Game>();
    
    public bool AddGame(Game game)
    {
        return _activeGames.TryAdd(game.Id, game);
    }

    public Game? GetGame(Guid id)
    {
        _activeGames.TryGetValue(id, out var game);
        return game;
    }

    public void RemoveGame(Guid id)
    {
        _activeGames.Remove(id, out _);
    }
}
