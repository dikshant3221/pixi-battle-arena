import { Sprite } from '@pixi/sprite';

/**
 * Manages temporary visual effects like explosions.
 */
export class ParticleManager {
  constructor(stage) {
    this.stage = stage;
    this.particles = [];
  }

  /**
   * Spawns a particle effect at a given location.
   * @param {string} type - Type of effect (currently supports 'explosion').
   * @param {number} x - X position.
   * @param {number} y - Y position.
   */
  spawn(type, x, y) {
    let sprite;

    if (type === 'explosion') {
      sprite = Sprite.from('assets/explosion.png');
    }

    if (!sprite) return;

    sprite.anchor.set(0.5);
    sprite.x = x;
    sprite.y = y;
    sprite.alpha = 1;
    sprite.scale.set(0.02);

    this.stage.addChild(sprite);
    this.particles.push({ sprite, lifetime: 30 });
  }

  /**
   * Updates all particles (fades and removes old ones).
   */
  update() {
    for (const p of this.particles) {
      p.lifetime--;
      p.sprite.alpha -= 0.03;
      if (p.lifetime <= 0) {
        this.stage.removeChild(p.sprite);
      }
    }

    this.particles = this.particles.filter(p => p.lifetime > 0);
  }
}
