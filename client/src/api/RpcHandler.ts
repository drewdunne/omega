/* eslint-disable @typescript-eslint/ban-types */
import * as signalR from '@microsoft/signalr';
import OmegaController from './OmegaController';

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
 
 type GameEndPayload = {
    GameId: number,
    GameResult: GameResult
 }

 enum RpcFunction {
  GameFound,
  GameStarted,
  OpponentEndedTurn,
  GameEnded
 }

const subscriptions = new Map<RpcFunction, Function[]>();


class RpcHandler {

  connection : signalR.HubConnection | null | undefined;

  constructor() {
    this.connection = null;
  }

  init = (cb : (res : string | null | undefined) => void) => {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('http://192.168.86.159:7159/omegaHub', {
        withCredentials: false}
      ).build();
    this.connection.start().then(() => cb(this.connection?.connectionId));
  };

  subscribe = (event : RpcFunction, action : Function) => {
    if (!subscriptions.has(event)) {
      subscriptions.set(event, []);
    }
    try{
      subscriptions?.get(event)?.push(action);
    }
    catch {
      throw new Error('Unable to Subscribe to RpcFunction');
    }
  };
  
  on = (event: RpcFunction, payload : unknown) => {
    subscriptions?.get(event)?.forEach(e => e(payload));
  };
}

const rpcHandler = new RpcHandler();

rpcHandler.connection?.on('gameFound', function (data: any) {
  console.log('RpcHandler Function \'gameFound\' Invoked via Rpc');
  subscriptions.get(RpcFunction.GameFound);
});

rpcHandler.connection?.on('gameStarted', function (data: any) {
  console.log('RpcHandler Function \'gameStarted\' Invoked via Rpc');
  subscriptions.get(RpcFunction.GameFound)?.forEach(e => e(data));
});

rpcHandler.connection?.on('opponentEndedTurn', function (data: any) {
  console.log('RpcHandler Function \'opponentEndedTurn\' Invoked via Rpc');
  subscriptions.get(RpcFunction.OpponentEndedTurn)?.forEach(e => e(data));
});

rpcHandler.connection?.on('gameEnded', function (data: any) {
  console.log('RpcHandler Function \'gameEnded\' Invoked via Rpc');
  subscriptions.get(RpcFunction.GameEnded)?.forEach(e => e(data));
});

export default rpcHandler;