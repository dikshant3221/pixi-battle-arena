// CollisionSystem.js
// Detects overlap between entities (via bounding boxes) and applies flat damage

import { System } from '../core/System.js';

export class CollisionSystem extends System {
  update() {
    const entities = Array.from(this.entities.values());

    for (let i = 0; i < entities.length; i++) {
      const e1 = entities[i];
      const s1 = e1.getComponent('SpriteComponent');
      const h1 = e1.getComponent('HealthComponent');
      const f1 = e1.getComponent('FactionComponent');

      if (!s1 || !h1 || !f1) continue;

      for (let j = i + 1; j < entities.length; j++) {
        const e2 = entities[j];
        const s2 = e2.getComponent('SpriteComponent');
        const h2 = e2.getComponent('HealthComponent');
        const f2 = e2.getComponent('FactionComponent');

        if (!s2 || !h2 || !f2) continue;

        // Skip collision between same team
        if (f1.team === f2.team) continue;

        const b1 = s1.sprite.getBounds();
        const b2 = s2.sprite.getBounds();

        const isColliding =
          b1.x < b2.x + b2.width &&
          b1.x + b1.width > b2.x &&
          b1.y < b2.y + b2.height &&
          b1.y + b1.height > b2.y;

        if (isColliding) {
          h1.takeDamage(2);
          h2.takeDamage(2);
        }
      }
    }
  }
}
