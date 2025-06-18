import { Component } from '../core/Component.js';

/**
 * Simple fading explosion effect for visuals.
 */
export class ExplosionComponent extends Component {
  constructor(sprite) {
    super();
    this.sprite = sprite;
    this.timer = 30;
  }

  /**
   * Reduces explosion timer and fades out the sprite.
   */
  update(delta) {
    this.timer -= delta;
    this.sprite.alpha -= 0.03;

    if (this.timer <= 0) {
      this.sprite.visible = false;
    }
  }

  /**
   * Returns true if the explosion effect is finished.
   */
  isDone() {
    return this.timer <= 0;
  }
}
