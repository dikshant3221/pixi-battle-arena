// HealthSystem.js
// Handles:
// - Death logic (removal, visual hide)
// - Player life loss and respawn
// - Score update on kill
// - Win/lose state detection

import { System } from '../core/System.js';
import { GameState } from '../core/GameState.js';
import { Texture } from '@pixi/core';
import { PositionComponent } from '../components/PositionComponent.js';
import { VelocityComponent } from '../components/VelocityComponent.js';
import { SpriteComponent } from '../components/SpriteComponent.js';
import { HealthComponent } from '../components/HealthComponent.js';
import { FactionComponent } from '../components/FactionComponent.js';
import { HealthBarComponent } from '../components/HealthBarComponent.js';

export class HealthSystem extends System {
  constructor(entities, playerEntity, ecs) {
    super(entities);
    this.player = playerEntity;
    this.ecs = ecs; // Needed for player respawn
  }

  update() {
    for (const entity of this.entities.values()) {
      const health = entity.getComponent('HealthComponent');
      const sprite = entity.getComponent('SpriteComponent')?.sprite;
      const flash = entity.getComponent('DamageFlashComponent');
      const faction = entity.getComponent('FactionComponent');

      if (!health || !sprite) continue;

      if (flash) flash.flash();

      // Hide sprite if health reaches zero
      if (!health.isAlive()) {
        sprite.visible = false;
        this.entities.delete(entity.id);

        // Track wave state for enemies
        if (faction?.team === 'enemy') {
          GameState.waveManager?.onEnemyKilled();
        }

        // Handle player death
        if (entity === this.player && !GameState.isGameOver) {
          
          GameState.lives--;

          if (GameState.lives <= 0) {
            GameState.isGameOver = true;
          } else {
            this.respawnPlayer();
          }
        }

        // Give score for killing enemy
        if (entity !== this.player && !GameState.isGameOver) {
          GameState.score += 100;
        }

        // Win check
        if (GameState.score >= 1000 && !GameState.isWin) {
          GameState.isWin = true;
        }
      }
    }
  }

 // Respawn the player with full HP and visuals
respawnPlayer() {
  // Load player texture
  const texture = Texture.from('assets/soldier.png');

  // Create new entity
  const newPlayer = this.ecs.createEntity();

  // Add core components
  newPlayer.addComponent(new PositionComponent(1000, 500));            // Spawn position
  newPlayer.addComponent(new VelocityComponent(0, 0));                // No movement on spawn
  newPlayer.addComponent(new SpriteComponent(texture));               // Visual sprite
  newPlayer.addComponent(new HealthComponent(100));                   // Full health
  newPlayer.addComponent(new FactionComponent('player'));             // Mark as player

  // Force reset HP to avoid bugs from stale reused components
  const health = newPlayer.getComponent('HealthComponent');
  health.current = health.max = 100;

  // Setup sprite display
  const sprite = newPlayer.getComponent('SpriteComponent').sprite;
  sprite.anchor.set(0.5);
  sprite.width = 48;
  sprite.height = 48;
  window.globalStage.addChild(sprite);

  // Add UI overlays (health bar, status effects if any)
  newPlayer.addComponent(new HealthBarComponent(sprite));

  // Update global references
  GameState.player = newPlayer;
  this.player = newPlayer;

  // Reassign AI enemies to track new player ID
  for (const entity of this.entities.values()) {
    const ai = entity.getComponent('AIComponent');
    if (ai && ai.mode === 'seek') {
      ai.targetId = newPlayer.id;
    }
  }
}
}
