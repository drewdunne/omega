import React, { useEffect, useState } from 'react';
import Menu from './views/MenuView';
import LoadingView from './views/LoadingView';
import GameView from './views/GameView';
import RpcHandler from './api/RpcHandler';
import rpcHandler from './api/RpcHandler';
import OmegaController from './api/OmegaController';

export enum GameMode { 'dev', 'normal' }
export enum View { 'menu', 'loading', 'game' }

let connectionActive = false;
/**
 * Parent-level Component that holds game-level logic.
 */
const App = () => {

  const [playerId, setPlayerId] = useState('');
  const [currentView, setCurrentView] = useState(<Menu changeView={changeView} playerId={playerId} />);
  const [currentMode, setCurrentMode] = useState(GameMode.normal);
  const [connectionId, setConnectionId] = useState('');

  
  if (!connectionActive) {
    connectionActive = true;
    rpcHandler.init((res) => {
      if (res) {
        console.log(res);
        setConnectionId(res);
      }
    });
  }
  
  if(connectionId) {
    console.log('ConnectionID Ran');
    const omegaController = new OmegaController();
    omegaController.bootstrap(rpcHandler.connection?.connectionId).then((playerId) => {
      if (playerId) {
        console.log('App.tsx: PlayerId is: ' + playerId);
        setPlayerId(playerId);
        setCurrentView(<Menu changeView={changeView} playerId={playerId} />);
      }
    });
  }

  // useEffect(() => {
  //   (async function bootstrap() : Promise<void> {
  //     if (!connectionActive) {
  //       connectionActive = true;

  //       await rpcHandler.init();
  //       const omegaController = new OmegaController();
  //       const playerId = await omegaController.bootstrap(rpcHandler.connection?.connectionId);
  //       if (playerId) {
  //         setPlayerId(playerId);
  //         setCurrentView(<Menu changeView={changeView} playerId={playerId}  />);
  //       }
  //     }
  //   })();
  // });

  function changeView(view: View, mode: GameMode = GameMode.normal): void {
    setCurrentMode(mode);
    const devModeLoadingTime = 500; //Load Time for dev mode

    switch (view) {
    case View.menu: {
      setCurrentView(<Menu changeView={changeView} playerId={playerId} />);
      break;
    }
    case View.loading: {
      setCurrentView(<LoadingView />);

      // If Dev Mode, show Loading only briefly
      mode === GameMode.dev ? setTimeout(() => changeView(View.game, GameMode.dev), devModeLoadingTime) : null;
      break;
    }
    case View.game: {
      setCurrentView(<GameView mode={mode} />);
      break;
    }
    default: {
      throw new Error('No Screen Type Provided');
    }
    }
  }

  return (
    <div className="home">
      {currentView}
    </div>
  );
};


export default App;

