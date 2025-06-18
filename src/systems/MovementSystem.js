// MovementSystem.js
// Updates entity position based on velocity and keeps them within screen bounds

import { System } from '../core/System.js';

export class MovementSystem extends System {
  update(delta) {
    for (const entity of this.entities.values()) {
      const pos = entity.getComponent('PositionComponent');
      const vel = entity.getComponent('VelocityComponent');
      const sprite = entity.getComponent('SpriteComponent')?.sprite;

      if (!pos || !vel) continue;

      pos.x += vel.vx * delta;
      pos.y += vel.vy * delta;

      // Clamp to screen bounds
      const minX = 0;
      const minY = 0;
      const maxX = window.innerWidth;
      const maxY = window.innerHeight;

      pos.x = Math.max(minX, Math.min(pos.x, maxX));
      pos.y = Math.max(minY, Math.min(pos.y, maxY));

      // Sync visual sprite
      if (sprite) {
        sprite.x = pos.x;
        sprite.y = pos.y;
      }
    }
  }
}
