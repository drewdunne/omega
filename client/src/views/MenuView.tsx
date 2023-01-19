import React from 'react';
import Button from '../components/Button';
import { GameMode, View } from '../App';
import OmegaController from '../api/OmegaController';

/**
 * Renders the Main Menu and handles operations which can be performed on that page
 * @Remarks Note that handlers which allow the screen to be changed are passed down to the page's buttons
 */

type Props = {
  changeView: (view: View, mode: GameMode) => void
}

const Menu = ({changeView}: Props) => {

  function play(mode : GameMode) {
    if(mode !== GameMode.dev) {
      const omegaController = new OmegaController();
      omegaController.findGame({Elo: 0}); // Temp
    }
    changeView(View.loading, mode);
  }

  function quit() {
    console.log('Thanks for Playing!');
  }

  return (
    <div className="mainmenu-view">
      <div className="logo" id="title-logo">LOGO HERE</div>
      <div id="menu_buttons">
        <Button classname="button menu" text="Play Now" id="play-button" handleClick={() => play(GameMode.normal)}/>
        <Button classname="button menu" text="Quit" id="quit-button" handleClick={quit}/>
        <Button classname="button menu" text="Dev Mode" id="dev-mode-button" handleClick={() => play(GameMode.dev)} />
      </div>
    </div>
  );
};

export default Menu;
