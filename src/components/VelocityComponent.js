import { Component } from '../core/Component.js';

/**
 * Stores velocity information for an entity.
 * Determines how much the entity moves per frame.
 */
export class VelocityComponent extends Component {
  constructor(vx = 0, vy = 0) {
    super();
    this.vx = vx; // Horizontal speed
    this.vy = vy; // Vertical speed
  }
}
