import { GameState } from './GameState.js';
import { Texture } from '@pixi/core';
import { createAIUnit } from '../utils/createAIUnit.js';

/**
 * Manages spawning enemies in waves and handling win conditions.
 */
export class WaveManager {
  constructor(stage, ecs, textures) {
    this.stage = stage;
    this.ecs = ecs;
    this.textures = textures;

    this.waves = [
      { count: 2, delay: 60 },  // Wave 1: spawn 2 enemies
      { count: 3, delay: 90 },  // Wave 2: spawn 3 enemies
      { count: 4, delay: 120 }, // Wave 3: spawn 4 enemies
    ];

    this.currentWave = -1;    // Index of current wave
    this.enemiesAlive = 0;    // How many enemies are alive
    this.timer = 0;           // Countdown to next wave
    this.started = false;     // Whether waves have started
  }

  /**
   * Starts the first wave.
   */
  start() {
    this.started = true;
    this.nextWave();
  }

  /**
   * Spawns the next wave of enemies.
   */
  nextWave() {
    this.currentWave++;

    // No more waves? Player wins
    if (this.currentWave >= this.waves.length) {
      GameState.isWin = true;
      return;
    }

    const wave = this.waves[this.currentWave];
    this.timer = wave.delay;
    this.enemiesAlive = wave.count;

    for (let i = 0; i < wave.count; i++) {
      const x = 100 + Math.random() * 600;
      const y = 100 + Math.random() * 300;

      const enemy = createAIUnit(
        x,
        y,
        Texture.from('assets/enemy.png'),
        this.ecs,
        'seek',
        GameState.player.id
      );

      // Note: enemy is already added to ECS in createAIUnit
      // this.ecs.entities.set(enemy.id, enemy); // optional
    }
  }

  /**
   * Updates wave timer and starts next wave when ready.
   */
  update(delta) {
    if (!this.started || GameState.isGameOver || GameState.isWin) return;

    // If no enemies left, countdown to next wave
    if (this.enemiesAlive <= 0) {
      this.timer -= delta;
      if (this.timer <= 0) {
        this.nextWave();
      }
    }
  }

  /**
   * Call this when an enemy dies to track wave progress.
   */
  onEnemyKilled() {
    this.enemiesAlive--;
  }

  /**
   * Displays current wave progress.
   */
  getWaveProgressText() {
    return `Wave ${Math.min(this.currentWave + 1, this.waves.length)} of ${this.waves.length}`;
  }
}
