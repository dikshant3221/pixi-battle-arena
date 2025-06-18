// PlayerMovementSystem.js
// Allows WASD or Arrow key movement for the player entity

import { System } from '../core/System.js';
import { GameState } from '../core/GameState.js';

export class PlayerMovementSystem extends System {
  constructor(entities) {
    super(entities);
    this.keys = {};

    // Listen to key presses
    window.addEventListener('keydown', (e) => this.keys[e.code] = true);
    window.addEventListener('keyup', (e) => this.keys[e.code] = false);
  }

  update(delta) {
    if (GameState.isGameOver || GameState.isWin) return;

    for (const entity of this.entities.values()) {
      const faction = entity.getComponent('FactionComponent');
      if (!faction || faction.team !== 'player') continue;

      const vel = entity.getComponent('VelocityComponent');
      if (!vel) continue;

      // Collect input
      let vx = 0, vy = 0;
      if (this.keys['KeyW'] || this.keys['ArrowUp']) vy -= 1;
      if (this.keys['KeyS'] || this.keys['ArrowDown']) vy += 1;
      if (this.keys['KeyA'] || this.keys['ArrowLeft']) vx -= 1;
      if (this.keys['KeyD'] || this.keys['ArrowRight']) vx += 1;

      // Normalize diagonal movement
      const length = Math.hypot(vx, vy) || 1;
      vel.vx = (vx / length) * 2.5;
      vel.vy = (vy / length) * 2.5;
    }
  }
}
