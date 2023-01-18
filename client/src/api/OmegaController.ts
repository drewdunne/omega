import axios from 'axios';
import { PieceType, Position } from '../views/GameView';

export type MoveAction = {
    StartPosition: Position,
    EndPosition: Position,
}

export type BuildAction = {
    PieceType: PieceType,
    Position: Position,
}

export type FindGamePayload = {
    Elo: number
}

export type JoinGamePayload = {
    MatchId: string
}

export type EndTurnPayload = {
    BuildAction: BuildAction
    MoveAction: MoveAction
}

export default class OmegaController {

  private url  = 'http://192.168.86.159:7159/omega';

  bootstrap = async () => {
    const res = await axios.get(this.url+'/bootstrap');
    console.log(`OmegaController.findGame: ${res}`);
    // Returns a model that only has 'PlayerId' of type number
  };

  findGame = async (payload: FindGamePayload) => {
    const res = await axios.post(this.url+'/findgame', payload);
    console.log(`OmegaController.findGame: ${res}`);
  };

  joinGame = async (payload: JoinGamePayload) => {
    const res = await axios.post(this.url+'/joingame', payload);
    console.log(`OmegaController.findGame: ${res}`);
  };

  endTurn = async (payload: EndTurnPayload) => {
    const res = await axios.post(this.url+'/doturn', payload);
    console.log(`OmegaController.findGame: ${res}`);
  };
}