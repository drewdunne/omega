import React, { useEffect } from 'react';
import axios from 'axios';
import Button from './Button';

/**
 * Primary Application Page which hosts Source Map and essential navigation features
 * @Remarks Serves as an abstraction layer for core application features - can be swapped out app App level 
 * for other feature pages as/if needed.
 */

type Props = any;

const Menu = (props: Props) => {

  const requestObj = {
    method: 'POST',
    url: 'http://192.168.86.159:7159/omega/hello',
    body: {
      PrintString: 'test'
    },
  };

  useEffect(() => {axios.post('http://192.168.86.159:7159/omega/hello', requestObj)
    .then((res : any)=> {console.log(res);});});

  return (
    <div className="mainmenu-view">
      <Button classname="button menu" text="Play Now" id="play-button"/>
      <Button classname="button menu" text="Quit" id="quit-button" />
    </div>
  );
};

export default Menu;
