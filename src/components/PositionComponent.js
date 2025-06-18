import { Component } from '../core/Component.js';

/**
 * Stores an entity's X and Y coordinates.
 */
export class PositionComponent extends Component {
  constructor(x = 0, y = 0) {
    super();
    this.x = x;
    this.y = y;
  }
}
