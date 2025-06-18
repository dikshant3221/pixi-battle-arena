// VisualEffectSystem.js
// Updates short-lived visuals like red damage tint and explosions

import { System } from '../core/System.js';

export class VisualEffectSystem extends System {
  update(delta) {
    for (const entity of this.entities.values()) {
      const flash = entity.getComponent('DamageFlashComponent');
      const explode = entity.getComponent('ExplosionComponent');

      if (flash) flash.update(delta);

      if (explode) {
        explode.update(delta);
        if (explode.isDone()) {
          this.entities.delete(entity.id); // Clean up expired FX
        }
      }
    }
  }
}
