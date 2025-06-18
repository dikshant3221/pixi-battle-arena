import { Component } from '../core/Component.js';

/**
 * Explosion effect using a provided texture that fades out over time.
 */
export class ExplosionEffectComponent extends Component {
  constructor(sprite, texture) {
    super();
    this.sprite = sprite;
    this.sprite.texture = texture;
    this.sprite.width = 48;
    this.sprite.height = 48;
    this.timer = 30;
  }

  /**
   * Reduces lifetime and fades the sprite.
   */
  update(delta) {
    this.timer -= delta;
    this.sprite.alpha -= 0.04;
  }

  /**
   * Returns true if the effect has finished.
   */
  isDone() {
    return this.timer <= 0;
  }
}
