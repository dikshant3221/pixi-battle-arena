import { Component } from '../core/Component.js';

/**
 * Assigns a team/faction label to an entity (e.g., 'player', 'enemy').
 */
export class FactionComponent extends Component {
  constructor(team = 'neutral') {
    super();
    this.team = team;
  }
}
