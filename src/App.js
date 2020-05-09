import globals from './globals';
import consts from './consts';
import {handleAI, handleKeys, handleMovement, handlePickups,
        handleShooting, handleWave} from './handlers';
import initialize from './initialize';
import React from 'react'
import TopHud from './components/TopHud'
import RightHud from './components/RightHud'
import BottomHud from './components/BottomHud'
import './App.css'

const App = () => {

  /**********************************************************
   * RENDER HANDLER
   **********************************************************/
  let onAnimationFrameHandler = (timeStamp) => {
    if (!globals.gameOver) {
      window.requestAnimationFrame(onAnimationFrameHandler);
      handleMovement();
      handleShooting();
      handleWave();
      handleAI();
      handlePickups();
      globals.scene.update && globals.scene.update(timeStamp);
      globals.composer.render();
    }
  };

  /**********************************************************
   * RESIZE HANDLER
   **********************************************************/
  let windowResizeHandler = () => {
    let {innerHeight, innerWidth} = window;
    globals.camera.aspect = innerWidth/innerHeight;
    globals.camera.updateProjectionMatrix();
    globals.renderer.setSize(innerWidth, innerHeight);
  };

  /**********************************************************
   * START APPLICATION
   **********************************************************/
  // initialize scene
  initialize();
  // create and add key handlers
  handleKeys();
  // start scene
  window.requestAnimationFrame(onAnimationFrameHandler);
  // start and add resize handler
  windowResizeHandler();
  window.addEventListener('resize', windowResizeHandler, false);

  return (
    <div>
      <TopHud 
        orange={globals.pacman.ammo['orange']}
        melon={globals.pacman.ammo['melon']}
      />
      <RightHud 
        score={globals.score}
        wave={globals.currentWave}
        enemies={globals.enemies.length}
      />
      <BottomHud hearts={consts.PACMAN_HEALTH} />
    </div>
  )
};

export default App