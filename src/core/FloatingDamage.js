import { Text } from '@pixi/text';
import gsap from 'gsap';

/**
 * Displays a floating damage number (like -10) above a given position.
 * The number rises and fades out smoothly.
 * @param {number} value - Amount of damage to display.
 * @param {number} x - X position of the damage.
 * @param {number} y - Y position of the damage.
 * @param {PIXI.Container} stage - PIXI stage to add the text to.
 * @param {number} [color] - Optional hex color, defaults to red.
 */
export function showFloatingDamage(value, x, y, stage, color = 0xff3333) {
  const dmgText = new Text(`-${value}`, {
    fontSize: 22,
    fill: color,
    fontWeight: 'bold',
    stroke: 0x000000,
    strokeThickness: 3,
  });

  dmgText.anchor?.set(0.5);
  dmgText.x = x;
  dmgText.y = y;
  dmgText.alpha = 1;

  stage.addChild(dmgText);

  gsap.to(dmgText, {
    y: y - 25,
    alpha: 0,
    duration: 0.5,
    ease: 'power1.out',
    onComplete: () => {
      if (dmgText.parent) dmgText.parent.removeChild(dmgText);
      dmgText.destroy(); // free GPU memory
    },
  });
}
