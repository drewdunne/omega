import React, { useState } from 'react';
import Menu from './views/MenuView';
import * as signalR from '@microsoft/signalr';
import LoadingScreen from './views/LoadingScreen';

export enum GameMode {'dev', 'normal'}
export enum View {'menu', 'loading', 'game'}

/**
 * Parent-level Component that holds game-level logic.
 */
const App = () => {

  (() => establishWebsocketConnection());

  const [currentView, setCurrentView] = useState(<Menu changeView={changeView} />);
  const [currentMode, setCurrentMode] = useState(GameMode.normal);

  function changeView(view : View, mode: GameMode = GameMode.normal) : void {
    setCurrentMode(mode);

    switch(view) {
    case View.menu: {
      setCurrentView(<Menu changeView={changeView} />);
      break;
    }
    case View.loading: {
      setCurrentView(<LoadingScreen />);
      
      // If Dev Mode, show Loading only briefly
      mode === GameMode.dev ? setTimeout(() => changeView(View.game, GameMode.dev), 1500) : null;
      break;
    }
    case View.game: {
      throw new Error('Not Yet Implemented');
    }
    default : {
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

function establishWebsocketConnection() {

  const connection = new signalR.HubConnectionBuilder().withUrl('http://192.168.86.159:7159/omegaHub', {
    withCredentials: false}
  ).build();

  connection.on('ReceiveMessage', function (user: any, message: any) {
    console.log(`${user} says {message{}}`);
  });

  connection.start().then(function () {
    console.log('Connected!');
  }).catch(function (err) {
    return console.error(err.toString());
  });

}

