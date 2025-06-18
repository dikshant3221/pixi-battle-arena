// WaveManagerSystem.js
// Handles spawning waves of enemies and detecting wave progression

import { System } from '../core/System.js';
import { createAIUnit } from '../utils/createAIUnit.js';
import { GameState } from '../core/GameState.js';

export class WaveManagerSystem extends System {
  constructor(entities, ecs, player, stage) {
    super(entities);
    this.ecs = ecs;
    this.stage = stage;
    this.player = player;

    // Configuration for each wave (enemy count + delay before next)
    this.waveConfig = [
      { count: 2, delay: 60 },
      { count: 3, delay: 100 },
      { count: 4, delay: 120 }
    ];

    this.currentWave = 0;
    this.timer = 0;
  }

  update(delta) {
    if (GameState.isGameOver || GameState.isWin) return;

    // Count remaining enemies
    const enemies = Array.from(this.entities.values()).filter(e =>
      e.getComponent('FactionComponent')?.team === 'enemy' &&
      e.getComponent('HealthComponent')?.isAlive()
    );

    // If all enemies dead and cooldown passed, spawn next wave
    if (enemies.length === 0 && this.timer <= 0) {
      if (this.currentWave >= this.waveConfig.length) {
        GameState.isWin = true;
        return;
      }

      const wave = this.waveConfig[this.currentWave++];
      for (let i = 0; i < wave.count; i++) {
        createAIUnit(
          100 + i * 50,
          100,
          0xff0000,
          this.ecs,
          'seek',
          this.player.id
        );
      }

      this.timer = wave.delay;
      GameState.currentWave = this.currentWave;
    } else {
      this.timer -= delta;
    }
  }
}
