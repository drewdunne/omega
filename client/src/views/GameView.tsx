import React from 'react';
import { GameMode } from '../App';
import Cell, { CellState, Color } from '../components/Cell';

export enum PieceType { Factory = 0, Gateway = 1, Pawn = 2, Rook = 3, Bishop = 4, Omega = 5 }
export type Position = {
    X: number,
    Y: number,
}

type Props = {
    mode: GameMode
}

/**
 * A robust class that handles updating game state and server communication for the client.
 * @param mode
 */

const GameView = ({mode}: Props) => {

  const cellArray : JSX.Element[] = [];

  const boardWidth = 10;
  const boardHeight = 10;

  let rowCount = 0;
  for(let x = 0; x <= boardWidth; x++) {
    rowCount += 1;
    for (let y = 0; y <= boardHeight; y++) {
      const color = getCellColor({X:x, Y:(y+rowCount)});
      cellArray.push(
        <Cell position={{X:x, Y:y}} color={color} state={CellState.Idle} id={'cell'+((x*boardWidth)+(y+rowCount))} />
      );
    }
  }

  return (
    <div className="gameboard">
      {cellArray}
    </div>
  );
};

export default GameView;

function getCellColor(position: { X: number; Y: number; }) : Color {
  //simple toggle color logic
  if ((position.X + position.Y) % 2 === 0) {
    return Color.Dark;
  }
  return Color.Light;
}
