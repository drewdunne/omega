
import React from 'react';
import { Position } from '../views/GameView';

export enum CellState { SelectedPiece, Move, Idle }
export enum Color { Dark, Light, SpecialDark, SpecialLight }

type Props = {
    position : Position,
    color : Color,
    state: CellState,
    id: string
    handeClick?: () => void;
}

const Cell = ({position, color, state, id}: Props) => {

  let classname;
  if (color === Color.Dark) {
    classname = 'cell ' + 'dark';
  }
  else if (color === Color.Light) {
    classname = 'cell ' + 'light';
  }
  else if (color === Color.SpecialDark) {
    classname = 'cell ' + 'special-dark';
  }
  else {
    classname = 'cell ' + 'special-light';
  }

  return (
    <div className={classname} id={id}></div>
  );
};

export default Cell;