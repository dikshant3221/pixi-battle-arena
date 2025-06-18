import { Component } from '../core/Component.js';

/**
 * Represents AI behavior for an entity.
 * Determines how the entity moves or reacts in the game world.
 */
export class AIComponent extends Component {
  constructor(mode = 'wander', targetId = null) {
    super();

    // Defines the behavior mode: can be 'wander', 'seek', or 'patrol'
    this.mode = mode;

    // ID of the target entity the AI should follow (only relevant for 'seek' mode)
    this.targetId = targetId;

    // Timer used for controlling how often direction changes in 'wander' mode
    this.wanderTimer = 0;

    // A list of coordinate points used for patrolling behavior
    this.patrolPoints = [];

    // Index of the current patrol point the entity is moving toward
    this.currentPoint = 0;
  }
}
