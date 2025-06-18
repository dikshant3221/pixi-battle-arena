// DoTSystem.js (Damage-over-Time)
// Applies periodic damage from effects like poison, and removes when done

import { System } from '../core/System.js';

export class DoTSystem extends System {
  update() {
    for (const entity of this.entities.values()) {
      const dot = entity.getComponent('DoTComponent');
      const health = entity.getComponent('HealthComponent');

      if (!dot || !health) continue;

      dot.timer++;
      dot.duration--;

      // Apply damage on interval
      if (dot.timer >= dot.interval) {
        dot.timer = 0;
        health.takeDamage(dot.damage);
      }

      // Remove when done
      if (dot.duration <= 0) {
        entity.removeComponent('DoTComponent');
        entity.getComponent('StatusEffectHUDComponent')?.hide(dot.type);
      }
    }
  }
}
