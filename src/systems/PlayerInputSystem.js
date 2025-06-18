// PlayerInputSystem.js
// Handles keyboard/mouse inputs to shoot bullets toward mouse direction

import { System } from '../core/System.js';
import { createBullet } from '../utils/createBullet.js';
import { GameState } from '../core/GameState.js';
import { SoundManager } from '../utils/SoundManager.js';

export class PlayerInputSystem extends System {
  constructor(entities, ecs, stage, textures, renderer) {
    super(entities);
    this.ecs = ecs;
    this.stage = stage;
    this.textures = textures;
    this.renderer = renderer;

    this.keys = {};
    this.cooldown = 0;
    this.mouse = { x: 0, y: 0 };

    // Mouse position tracking
    window.addEventListener('mousemove', (e) => {
      const canvas = document.querySelector('canvas');
      const rect = canvas.getBoundingClientRect();
      const screenX = e.clientX - rect.left;
      const screenY = e.clientY - rect.top;
      const worldPos = this.stage.toLocal({ x: screenX, y: screenY });
      this.mouse.x = worldPos.x;
      this.mouse.y = worldPos.y;
    });

    // Input events
    window.addEventListener('keydown', (e) => this.keys[e.code] = true);
    window.addEventListener('keyup', (e) => this.keys[e.code] = false);
    window.addEventListener('mousedown', () => this.keys['Mouse'] = true);
    window.addEventListener('mouseup', () => this.keys['Mouse'] = false);
  }

  update(delta) {
    if (GameState.isGameOver || GameState.isWin) return;

    this.cooldown -= delta;
    if (this.cooldown > 0) return;

    for (const entity of this.entities.values()) {
      const faction = entity.getComponent('FactionComponent');
      if (!faction || faction.team !== 'player') continue;

      const pos = entity.getComponent('PositionComponent');
      const sprite = entity.getComponent('SpriteComponent')?.sprite;
      if (!pos || !sprite) continue;

      if (this.keys['Space'] || this.keys['Mouse']) {
        const dx = this.mouse.x - pos.x;
        const dy = this.mouse.y - pos.y;
        const length = Math.hypot(dx, dy) || 1;
        const bulletSpeed = 6;

        const vx = (dx / length) * bulletSpeed;
        const vy = (dy / length) * bulletSpeed;

        SoundManager.play('shoot');
        createBullet(pos.x, pos.y, vx, vy, 10, this.ecs, entity);

        this.cooldown = 20;
      }

      // Rotate sprite toward mouse
      const dx = this.mouse.x - sprite.x;
      const dy = this.mouse.y - sprite.y;
      sprite.rotation = Math.atan2(dy, dx);
    }
  }
}
