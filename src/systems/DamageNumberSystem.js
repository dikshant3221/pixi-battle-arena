// DamageNumberSystem.js
// Displays floating damage numbers that fade and rise, then get cleaned up

import { System } from '../core/System.js';
import { GameState } from '../core/GameState.js';

export class DamageNumberSystem extends System {
  update(delta) {
    if (GameState.isGameOver || GameState.isWin) return;

    for (const entity of this.entities.values()) {
      const dmg = entity.getComponent('DamageNumberComponent');
      const sprite = entity.getComponent('SpriteComponent');

      if (!dmg || !sprite) continue;

      // Make number rise up
      sprite.sprite.y -= 0.5;

      // Fade out gradually
      sprite.sprite.alpha = dmg.life / dmg.maxLife;

      dmg.update();

      // Remove when expired
      if (dmg.isExpired()) {
        sprite.sprite.visible = false;
        this.entities.delete(entity.id);
      }
    }
  }
}
