import axios from 'axios';
import { PieceType, Position } from '../views/GameView';
import rpcHandler from './RpcHandler';

export type MoveAction = {
    StartPosition: Position,
    EndPosition: Position,
}

export type BuildAction = {
    PieceType: PieceType,
    Position: Position,
}

export type FindGamePayload = {
    Elo: number,
    PlayerId: string,
}

export type JoinGamePayload = {
    MatchId: string,
    PlayerNumber: number,
}

export type EndTurnPayload = {
    BuildAction: BuildAction
    MoveAction: MoveAction
}

type BootstrapOutput = {
  playerId: string;
}

export default class OmegaController {

  private url  = 'http://192.168.86.159:7159/omega';

  bootstrap = async (payload: string | null | undefined) : Promise<string> => {
    const url = this.url+'/bootstrap?'+'connectionId='+payload;
    console.log('Called Bootstrap, sending Axios GET Request:'+ url) ;
    const res = await axios.get(url);
    return res.data.playerId;
    // Returns a model that only has 'PlayerId' of type number
  };

  findGame = async (payload: FindGamePayload) => {
    console.log('Omega Controller.findGame payload:');
    console.log(payload);
    await axios.post(this.url+'/findgame', payload);
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