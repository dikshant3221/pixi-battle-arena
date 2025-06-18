import { Component } from '../core/Component.js';
import { Sprite } from '@pixi/sprite';
import { Texture } from '@pixi/core';

/**
 * Wraps a PIXI.Sprite for visual display of an entity.
 * Accepts either a PIXI.Texture or an existing Sprite.
 */
export class SpriteComponent extends Component {
  constructor(input) {
    super();

    if (input instanceof Sprite) {
      this.sprite = input;
    } else {
      const texture = input || Texture.WHITE;
      this.sprite = new Sprite(texture);
      this.sprite.width = 50;
      this.sprite.height = 50;
    }
  }
}
