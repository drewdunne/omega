import React from 'react';
import { Position } from '../views/GameView';

export enum CellState { SelectedPiece, Move, Idle }
export enum Color { Dark, Light, SpecialDark, SpecialLight }

type Props = {
    position : Position,
    color : Color,
    state: CellState,
    id: string
}

const Cell = ({position, color, state, id}: Props) => {

  let classname;
  if (color === Color.Dark) {
    classname = 'cell ' + 'dark';
  }
  else {
    classname = 'cell ' + 'light';
  }

  return (
    <div className={classname} id={id}></div>
  );
};

export default Cell;