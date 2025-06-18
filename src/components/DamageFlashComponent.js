import { Component } from '../core/Component.js';

/**
 * Temporarily flashes the sprite red when damage is taken.
 */
export class DamageFlashComponent extends Component {
  constructor(sprite) {
    super();
    this.sprite = sprite; // The target sprite to flash
    this.timer = 0;       // Tracks remaining flash duration
  }

  /**
   * Triggers the red flash effect for a short duration.
   * @param {number} duration - How long the flash lasts (in frames)
   */
  flash(duration = 10) {
    this.timer = duration;
    this.sprite.tint = 0xff0000; 
  }

  /**
   * Updates the flash timer and resets tint when done.
   */
  update(delta) {
    if (this.timer > 0) {
      this.timer -= delta;
      if (this.timer <= 0) {
        this.sprite.tint = 0xffffff;
      }
    }
  }
}
