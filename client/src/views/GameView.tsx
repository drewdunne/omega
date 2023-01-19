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

const boardWidth = 10;
const boardHeight = 10;

const GameView = ({mode}: Props) => {

  const playerNumber = 0; // modify to initialize value via gameStartedNotification
  const cellArray : JSX.Element[] = [];
  const renderedBoard : (JSX.Element | undefined)[] = [];
  
  const populateCells = () => {
    for(let x = 0; x < boardWidth; x++) {
      for (let y = 0; y < boardHeight; y++) {
        const position = {X:x, Y:y};
        let color = getCellColor(position);
        
        // Check if the cell is within the 4x4 checkerboard in the middle
        if (x >= 3 && x <= 6 && y >= 3 && y <= 6) {
          if((x+y) % 2 === 0) {
            color = Color.SpecialLight;
          }
          else {
            color = Color.SpecialDark;
          }
        }
        
        cellArray.push(
          <Cell position={position} color={color} state={CellState.Idle} id={'cell'+getCellNumber(position)} />
        );
      }
    }
  };
    
  const renderBoard = (playerNumber : number) => {
    if (playerNumber === 0) {
      cellArray.forEach(e => renderedBoard.push(e));
    }
    else {
      while (cellArray.length) {
        renderedBoard.push(cellArray.pop());
      }
    }
  };

  populateCells();
  renderBoard(playerNumber);

  return (
    <div className='gameplay-view'>
      <div className="gameboard">
        {renderedBoard}
      </div>
    </div>
  );
};

export default GameView;

function getCellColor(position: { X: number; Y: number; }) : Color {
  //simple toggle color logic
  if ((getCellNumber(position)+position.X) % 2 === 0) {
    return Color.Dark;
  }
  return Color.Light;
}

function getCellNumber(position: {X: number; Y: number; }) : number {
  return (position.X*boardWidth)+(position.Y+1);
}