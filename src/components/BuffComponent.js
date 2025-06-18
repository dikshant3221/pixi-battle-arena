import { Component } from '../core/Component.js';

/**
 * Component that represents a temporary buff.
 */
export class BuffComponent extends Component {
  constructor(type = 'speed', duration = 100) {
    super();
    this.type = type;   
    this.timer = duration; // Duration remaining (in frames)
  }

  /**
   * Reduces the remaining buff duration over time.
   */
  update(delta) {
    this.timer -= delta;
  }

  /**
   * Returns true if the buff has expired.
   */
  isExpired() {
    return this.timer <= 0;
  }
}
