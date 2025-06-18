import { Component } from '../core/Component.js';

/**
 * Manages an entity’s health state.
 */
export class HealthComponent extends Component {
  constructor(max = 100) {
    super();
    this.max = max;
    this.current = max;
  }

  /**
   * Reduces current HP by a given amount.
   */
  takeDamage(dmg = 10) {
    this.current = Math.max(0, this.current - dmg);
  }

  /**
   * Returns true if the entity is still alive.
   */
  isAlive() {
    return this.current > 0;
  }
}
