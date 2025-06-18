import { Component } from '../core/Component.js';

/**
 * Applies damage-over-time (burn, poison) to an entity.
 */
export class DoTComponent extends Component {
  constructor(type = 'burn', damage = 1, duration = 180, interval = 30) {
    super();
    this.type = type;         // Type of effect ('burn', 'poison', etc.)
    this.damage = damage;     // Damage per tick
    this.duration = duration; // Total duration in frames
    this.interval = interval; // Time between each tick
    this.timer = 0;           // Tracks when next tick should apply
  }
}
