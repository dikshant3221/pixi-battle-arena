import { Component } from '../core/Component.js';
import { Graphics } from '@pixi/graphics';
import gsap from 'gsap';

/**
 * Displays a dynamic health bar above an entity.
 */
export class HealthBarComponent extends Component {
  constructor(targetSprite, width = 500, height = 100) {
    super();
    this.width = width;
    this.height = height;
    this.target = targetSprite;

    this.bar = new Graphics();
    this.bar.x = -width / 2;
    this.bar.y = -targetSprite.height / 2 - height - 624;

    this.target.addChild(this.bar);
    this.percent = 1;
  }

  /**
   * Updates health bar fill based on current health percentage.
   */
  update(current, max) {
    if (typeof current !== 'number' || typeof max !== 'number') return;

    const targetPercent = Math.max(current / max, 0);

    // Animate percent value smoothly
    gsap.to(this, {
      percent: targetPercent,
      duration: 0.3,
      ease: 'power1.out',
      overwrite: 'auto'
    });

    this.bar.clear();

    // Background bar
    this.bar.beginFill(0xff0000);
    this.bar.drawRect(0, 0, this.width, this.height);
    this.bar.endFill();

    // Foreground bar (color based on remaining HP)
    let color = 0x00ff00;
    if (this.percent < 0.4) color = 0xff0000;
    else if (this.percent < 0.7) color = 0xffff00;

    this.bar.beginFill(color);
    this.bar.drawRect(0, 0, this.width * this.percent, this.height);
    this.bar.endFill();
  }
}
