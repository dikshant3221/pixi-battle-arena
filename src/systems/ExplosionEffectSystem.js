// ExplosionEffectSystem.js
// Fades and removes explosion visuals once complete

import { System } from '../core/System.js';

export class ExplosionEffectSystem extends System {
  update(delta) {
    for (const entity of Array.from(this.entities.values())) {
      const comp = entity.getComponent('ExplosionEffectComponent');
      if (!comp) continue;

      comp.update(delta);

      if (comp.isDone()) {
        comp.sprite.visible = false;
        this.entities.delete(entity.id);
      }
    }
  }
}
