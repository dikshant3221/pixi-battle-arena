import { Component } from '../core/Component.js';

/**
 * Component for managing attack logic, including damage and cooldown handling.
 */
export class AttackComponent extends Component {
  constructor(damage = 10, cooldown = 60) {
    super();
    this.damage = damage;
    this.cooldown = cooldown;
    this.timer = 0; // Tracks cooldown time between attacks
  }

  /**
   * Decreases the cooldown timer based on elapsed time.
   */
  update(delta) {
    if (this.timer > 0) {
      this.timer -= delta;
    }
  }

  /**
   * Returns true if the entity is ready to attack.
   */
  canAttack() {
    return this.timer <= 0;
  }

  /**
   * Resets the cooldown timer after an attack is triggered.
   */
  resetCooldown() {
    this.timer = this.cooldown;
  }
}
