import {Group} from 'three';

import globals from '../../globals';

import CHERRY_glb from '../../models/cherry.glb';
import FREEZE_glb from '../../models/freeze.glb';
import MELON_glb from '../../models/melon.glb';
import ORAGNGE_glb from '../../models/orange.glb';
import STAR_glb from '../../models/star.glb';
import HEART_glb from '../../models/heart.glb';

class Pickup extends Group {
  constructor(name, type) {
    // Call parent Group() constructor
    super();

    this.name = name;
    this.type = type;
    this.hoverHeight = Math.random() * 0.05 + 0.1;
    this.seed = Math.random()

    let model = null;
    switch (type) {
      case 'ammo': {
        switch (name) {
          case 'cherry': {
            model = CHERRY_glb;
            break;
          }
          case 'orange': {
            model = ORAGNGE_glb;
            break;
          }
          case 'melon': {
            model = MELON_glb;
            break;
          }
        }
        break;
      }
      case 'powerup': {
        switch (name) {
          case 'freeze': {
            model = FREEZE_glb;
            break;
          }
          case 'star': {
            model = STAR_glb;
            break;
          }
          case 'heart': {
            model = HEART_glb;
            break;
          }
        }
        break;
      }
    }

    globals.loader.load(model, (gltf) => {
      this.add(gltf.scene);
    });
  }
}

export default Pickup;