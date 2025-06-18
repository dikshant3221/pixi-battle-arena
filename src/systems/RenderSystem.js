// RenderSystem.js
// Ensures sprite positions are synced to their PositionComponent

import { System } from '../core/System.js';

export class RenderSystem extends System {
  update() {
    for (const entity of this.entities.values()) {
      const pos = entity.getComponent('PositionComponent');
      const spriteComp = entity.getComponent('SpriteComponent');

      if (pos && spriteComp) {
        spriteComp.sprite.x = pos.x;
        spriteComp.sprite.y = pos.y;
      }
    }
  }
}
