import { Application as PixiApp } from '@pixi/app';
import { Ticker } from '@pixi/ticker';

/**
 * Sets up the PIXI application and runs the main game loop.
 */
export class Application {
  constructor(width = 1280, height = 720) {
    this.ticker = new Ticker();

    this.app = new PixiApp({
      width,
      height,
      backgroundColor: 0x1d1d1d,
      antialias: true,
      view: this._createCanvas(),
    });

    this.ticker.start();
  }

  /**
   * Creates and attaches a canvas element to the document body.
   */
  _createCanvas() {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    return canvas;
  }

  /**
   * Provides access to the root display container.
   */
  get stage() {
    return this.app.stage;
  }

  /**
   * Starts the main update loop.
   * @param {Function} updateCallback - Function called every frame.
   */
  run(updateCallback) {
    this.ticker.add(updateCallback);
  }
}
