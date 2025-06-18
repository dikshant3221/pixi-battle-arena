import { Component } from '../core/Component.js';
import { Graphics } from '@pixi/graphics';

/**
 * Displays a cooldown bar above a sprite, used to show ability recharge time.
 */
export class CooldownBarComponent extends Component {
  constructor(sprite) {
    super();

    // Background and foreground bars for cooldown visualization
    this.bg = new Graphics();
    this.bar = new Graphics();

    // Attach the bars to the target sprite
    sprite.addChild(this.bg);
    sprite.addChild(this.bar);
  }

  /**
   * Updates the cooldown bar's visual width and color based on current timer.
   * @param {number} current - Time remaining until the action is ready
   * @param {number} max - Total cooldown duration
   */
  updateBar(current, max) {
    // Draw static background bar
    this.bg.clear()
      .beginFill(0x333333)
      .drawRect(0, -10, 50, 5)
      .endFill();

    // Compute cooldown ratio and fill color
    const ratio = current / max;
    const color = ratio <= 0 ? 0x00ff00 : 0xff0000; // Green when ready, red otherwise

    // Draw the current cooldown fill
    this.bar.clear()
      .beginFill(color)
      .drawRect(0, -10, 50 * (1 - ratio), 5)
      .endFill();
  }
}
