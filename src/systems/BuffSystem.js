// BuffSystem.js
// Handles temporary buffs like speed boosts with auto-expiration

import { System } from '../core/System.js';

export class BuffSystem extends System {
  update(delta) {
    for (const entity of this.entities.values()) {
      const buff = entity.getComponent('BuffComponent');
      const vel = entity.getComponent('VelocityComponent');

      if (!buff) continue;

      buff.update(delta);

      // Apply buff effect (e.g. speed increase)
      if (buff.type === 'speed' && vel) {
        vel.vx *= 1.01;
        vel.vy *= 1.01;
      }

      // Remove expired buff
      if (buff.isExpired()) {
        entity.removeComponent('BuffComponent');
      }
    }
  }
}
