// BulletSystem.js
// Handles logic for bullets in the game:
// - Movement & expiration
// - Collision with enemies
// - Damage application
// - Explosion + floating damage + DoT effect

import { System } from '../core/System.js';
import { showFloatingDamage } from '../core/FloatingDamage.js';
import { GameState } from '../core/GameState.js';
import { DoTComponent } from '../components/DotComponenet.js';
import { SoundManager } from '../utils/SoundManager.js';

export class BulletSystem extends System {
  constructor(entities, ecs, stage, fxManager) {
    super(entities);
    this.ecs = ecs;         // Full ECSManager (for creating/removing entities)
    this.stage = stage;     // PIXI stage reference
    this.fxManager = fxManager; // Handles particle explosion
  }

  update(delta) {
    if (GameState.isGameOver || GameState.isWin) return;

    for (const entity of Array.from(this.entities.values())) {
      const bullet = entity.getComponent('BulletComponent');
      const pos = entity.getComponent('PositionComponent');
      const spriteComp = entity.getComponent('SpriteComponent');

      if (!bullet || !pos || !spriteComp) continue;

      // Countdown lifetime
      bullet.update(delta);

      const attacker = bullet.owner;
      const attackerFaction = attacker?.getComponent('FactionComponent')?.team;

      for (const target of this.entities.values()) {
        if (entity === target) continue;

        const health = target.getComponent('HealthComponent');
        const targetSprite = target.getComponent('SpriteComponent');
        const targetFaction = target.getComponent('FactionComponent')?.team;

        if (!health || !targetSprite) continue;

        // Prevent friendly fire
        if (attackerFaction && targetFaction && attackerFaction === targetFaction) continue;

        // Collision check (bounding box)
        const bulletBounds = spriteComp.sprite.getBounds();
        const targetBounds = targetSprite.sprite.getBounds();

        const hit =
          bulletBounds.x < targetBounds.x + targetBounds.width &&
          bulletBounds.x + bulletBounds.width > targetBounds.x &&
          bulletBounds.y < targetBounds.y + targetBounds.height &&
          bulletBounds.y + bulletBounds.height > targetBounds.y;

        if (hit) {
          // Apply base damage
          health.takeDamage(bullet.damage);

          // Optional: Apply DoT (e.g., poison)
          const shouldApplyPoison = true; // Can be changed per bullet type
          if (shouldApplyPoison) {
            target.addComponent(new DoTComponent('poison', 2, 180, 30));
            target.getComponent('StatusEffectHUDComponent')?.show('poison');
          }

          // Display floating damage number
          if (targetSprite && window.globalStage) {
            showFloatingDamage(bullet.damage, targetSprite.x, targetSprite.y, window.globalStage);
          }

          // Spawn explosion effect
          this.fxManager.spawn(
            'explosion',
            targetBounds.x + targetBounds.width / 2,
            targetBounds.y + targetBounds.height / 2
          );

          // Play explosion sound
          SoundManager.play('explosion');

          // Destroy bullet
          spriteComp.sprite.visible = false;
          this.entities.delete(entity.id);
          break; // Stop checking further collisions
        }
      }

      // Cleanup expired bullet
      if (bullet.isExpired()) {
        spriteComp.sprite.visible = false;
        this.entities.delete(entity.id);
      }
    }
  }
}
