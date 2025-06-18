import { Component } from '../core/Component.js';

/**
 * Component representing a bullet's lifetime, damage, and owner.
 */
export class BulletComponent extends Component {
  constructor(lifetime = 180, damage = 5, owner = null) {
    super();
    this.timer = lifetime; // Time before the bullet expires (in frames)
    this.damage = damage;  // Damage dealt on impact
    this.owner = owner;    // Reference to the entity that fired the bullet
  }

  /**
   * Reduces bullet lifetime as the game progresses.
   */
  update(delta) {
    this.timer -= delta;
  }

  /**
   * Returns true if the bullet's lifetime has ended.
   */
  isExpired() {
    return this.timer <= 0;
  }
}
