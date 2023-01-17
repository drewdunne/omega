
public class Server {
    public List<Game> Games { }

    public void Tick() {
        
    }
}

public class Game
{
    Player player1;
    Player player2;
    Player activePlayer;

    enum GameResult
    {
        Player1Wins,
        Player2Wins,
        Player1Resigns,
        Player2Resigns,
        Draw,
        Pending,
        Player1Quit,
        Player2Quit,
        Player1Timeout,
        Player2Timeout,
    }

    public GameResult EvaluateEndGame()
    {

    }

    public void Tick()
    {
        activePlayer.DoTurn();
        EvaluateEndGame();
        if (activePlayer == player1)
        {
            activePlayer = player2;
        }
        else
        {
            activePlayer = player1;
        }
    }
}
class Board
{
    public List<Cell> Cells { }
    public List<CommandLog> CommandHistory { }

    public void ProcessCommand(ICommand cmd)
    {

    }
}

public class CommandLog
{
    public int TurnID { }
    public ICommand Command { }
    public PieceType Attacker {}
    public PieceType Defender { }
}

public struct Position
{
    public int x;
    public int y;
}

public class Cell
{
    enum CellState { SelectedPiece, Move, Idle }
    enum Color { Dark, Light, SpecialDark, SpecialLight }

    public Position Position { }
    public Color Color { }

    public CellState State { }
    public IPiece Piece { }
}

public enum PieceType { Factory, Gateway, Pawn, Rook, Bishop, Omega }

public interface IPiece
{
    public Position Position { }
    public PieceType Piece { }
    public List<Position> GetLegalMoves()
    {
    }
}

// example of concrete IPiece implementation
public class Omega : IPiece
{
    // implements Piece interface
}

public class Player
{
    public enum TurnPhase
    {
        Build,
        Move
    }

    public int Energy { get; set; }
    public TurnPhase TurnPhase { get; set; }
    public PieceType SelectedPiece { get; set; }

    public void DoTurn()
    {
        switch (TurnPhase)
        {
        }
    }
}

public interface ICommand
{
    public Player Player { }
}

public class BuildCommand : ICommand
{
    public Position Position;
    public PieceType Piece { }
}
public class MoveCommand : ICommand
{
    public Position StartPosition;
    public Position EndPosition;
}