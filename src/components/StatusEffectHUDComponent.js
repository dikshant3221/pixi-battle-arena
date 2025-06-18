import { Component } from '../core/Component.js';
import { Container } from '@pixi/display';
import { Sprite } from '@pixi/sprite';
import { Texture } from '@pixi/core';

/**
 * Displays status effect icons (e.g., poison) above the entity.
 */
export class StatusEffectHUDComponent extends Component {
  constructor(targetSprite) {
    super();
    this.root = new Container();
    this.root.y = -30;
    this.icons = {};
    targetSprite.addChild(this.root);
  }

  /**
   * Shows a status icon of the given type.
   */
  show(type) {
    if (this.icons[type]) return;

    const icon = new Sprite(Texture.from(`assets/status_${type}.png`));
    icon.width = icon.height = 500;
    icon.x = -300;
    icon.y = -1200;

    this.root.addChild(icon);
    this.icons[type] = icon;
  }

  /**
   * Hides a status icon if it's currently visible.
   */
  hide(type) {
    const icon = this.icons[type];
    if (icon) {
      this.root.removeChild(icon);
      delete this.icons[type];
    }
  }
}
