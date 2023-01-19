import React from 'react';
import { GameMode } from '../App';

type Props = {
    mode: GameMode
}

const GameView = ({mode}: Props) => {
  return (
    <div>GameView</div>
  );
};

export default GameView;