// HealthBarSystem.js
// Syncs health component values with the visual health bar above the entity

import { System } from '../core/System.js';

export class HealthBarSystem extends System {
  update(delta) {
    for (const entity of this.entities.values()) {
      const hp = entity.getComponent('HealthComponent');
      const hb = entity.getComponent('HealthBarComponent');

      if (!hp || !hb) continue;

      hb.update(hp.current, hp.max);
    }
  }
}
