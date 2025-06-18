// AttackSystem.js
// Handles direct collision-based melee damage between AI and their targets.
// Used for AI-to-AI or AI-to-player physical attacks (not bullets).

import { System } from '../core/System.js';

export class AttackSystem extends System {
  update(delta) {
    const entities = Array.from(this.entities.values());

    for (const attacker of entities) {
      const atkComp = attacker.getComponent('AttackComponent');
      const spriteA = attacker.getComponent('SpriteComponent');
      const ai = attacker.getComponent('AIComponent');
      const attackerFaction = attacker.getComponent('FactionComponent')?.team;

      if (!atkComp || !spriteA || !ai) continue;

      // Update cooldown timer
      atkComp.update(delta);

      // Only perform attack if in seek mode and has a valid target
      if (ai.mode !== 'seek' || !ai.targetId) continue;

      const target = this.entities.get(ai.targetId);
      const spriteB = target?.getComponent('SpriteComponent');
      const targetFaction = target?.getComponent('FactionComponent')?.team;
      const healthB = target?.getComponent('HealthComponent');

      // Skip if missing required components
      if (!spriteB || !healthB) continue;

      // Avoid friendly fire
      if (attackerFaction && targetFaction && attackerFaction === targetFaction) continue;

      // Bounding box intersection check
      const a = spriteA.sprite.getBounds();
      const b = spriteB.sprite.getBounds();

      const intersects =
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y;

      // If within melee range and cooldown allows, deal damage
      if (intersects && atkComp.canAttack()) {
        healthB.takeDamage(atkComp.damage);
        atkComp.resetCooldown();
      }
    }
  }
}
