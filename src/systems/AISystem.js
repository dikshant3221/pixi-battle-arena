// AISystem.js
// This system handles all AI-controlled entities including:
// - Seek behavior: pursuing a target
// - Wander behavior: random movement
// - Patrol behavior: follow predefined waypoints
// - Fleeing when low HP
// - Dodging bullets
// - Attacking using projectiles

import { System } from '../core/System.js';
import { createBullet } from '../utils/createBullet.js';

export class AISystem extends System {
  constructor(entities, ecsManager) {
    super(entities);
    this.ecs = ecsManager; // Full ECS reference for spawning bullets
  }

  update(delta) {
    for (const entity of this.entities.values()) {
      const ai = entity.getComponent('AIComponent');
      const pos = entity.getComponent('PositionComponent');
      const vel = entity.getComponent('VelocityComponent');
      const atk = entity.getComponent('AttackComponent');
      const health = entity.getComponent('HealthComponent');

      if (!ai || !pos || !vel) continue;

      // ──────────────────────────────
      // Seek Mode: Move toward a target and attack
      // ──────────────────────────────
      if (ai.mode === 'seek' && ai.targetId !== null) {
        const target = this.entities.get(ai.targetId);
        const targetPos = target?.getComponent('PositionComponent');
        if (!target || !targetPos) continue;

        const dx = targetPos.x - pos.x;
        const dy = targetPos.y - pos.y;
        const len = Math.hypot(dx, dy) || 1;

        // Retreat logic if low HP
        if (health && health.current < 30) {
          vel.vx = -(dx / len) * 2;
          vel.vy = -(dy / len) * 2;
          continue; // skip attacking while fleeing
        }

        // Normal seek movement
        const speed = 1.2;
        vel.vx = (dx / len) * speed;
        vel.vy = (dy / len) * speed;

        // Dodge nearby bullets
        for (const other of this.entities.values()) {
          const bullet = other.getComponent('BulletComponent');
          if (!bullet || bullet.owner === entity) continue;

          const bPos = other.getComponent('PositionComponent');
          const dx = pos.x - bPos.x;
          const dy = pos.y - bPos.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 100) {
            vel.vx += (dx / dist) * 0.5;
            vel.vy += (dy / dist) * 0.5;
          }
        }

        // Shoot at player
        if (atk && atk.canAttack()) {
          const bulletSpeed = 3;
          const vx = (dx / len) * bulletSpeed;
          const vy = (dy / len) * bulletSpeed;

          createBullet(pos.x, pos.y, vx, vy, atk.damage, this.ecs, entity);
          atk.resetCooldown();
        }

        // Update cooldown bar if present
        if (atk) atk.update(delta);
        const cooldownBar = entity.getComponent('CooldownBarComponent');
        if (cooldownBar) {
          cooldownBar.updateBar(atk.timer, atk.cooldown);
        }
      }

      // ──────────────────────────────
      // Wander Mode: Random movement direction every few seconds
      // ──────────────────────────────
      else if (ai.mode === 'wander') {
        ai.wanderTimer -= delta;

        if (ai.wanderTimer <= 0) {
          ai.wanderTimer = 40 + Math.random() * 80;
          vel.vx = (Math.random() - 0.5) * 2;
          vel.vy = (Math.random() - 0.5) * 2;
        }
      }

      // ──────────────────────────────
      // Patrol Mode: Move between predefined patrol points
      // ──────────────────────────────
      else if (ai.mode === 'patrol') {
        if (ai.patrolPoints.length < 2) continue;

        const point = ai.patrolPoints[ai.currentPoint];
        const dx = point.x - pos.x;
        const dy = point.y - pos.y;
        const len = Math.hypot(dx, dy) || 1;

        const speed = 1.2;
        vel.vx = (dx / len) * speed;
        vel.vy = (dy / len) * speed;

        // Move to next patrol point when close enough
        if (len < 5) {
          ai.currentPoint = (ai.currentPoint + 1) % ai.patrolPoints.length;
        }
      }
    }
  }
}
