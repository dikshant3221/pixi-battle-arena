import { Component } from '../core/Component.js';

/**
 * Represents floating damage text that fades over time.
 */
export class DamageNumberComponent extends Component {
  constructor(text, lifetime = 40) {
    super();
    this.text = text;          
    this.life = lifetime;       // Remaining lifetime in frames
    this.maxLife = lifetime;    // Total lifespan
  }

  /**
   * Reduces the remaining life of the damage number.
   */
  update() {
    this.life--;
  }

  /**
   * Returns true if the damage number has expired.
   */
  isExpired() {
    return this.life <= 0;
  }
}
