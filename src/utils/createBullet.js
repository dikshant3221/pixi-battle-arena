/**
 * Creates a bullet entity with position, velocity, damage, and visual sprite.
 * @param {number} x - Start X position
 * @param {number} y - Start Y position
 * @param {number} vx - Velocity X
 * @param {number} vy - Velocity Y
 * @param {number} damage - Damage caused by bullet
 * @param {ECSManager} ecs - ECS manager instance
 * @param {Entity} attacker - Entity that fired this bullet
 */
import { PositionComponent } from '../components/PositionComponent.js';
import { VelocityComponent } from '../components/VelocityComponent.js';
import { SpriteComponent } from '../components/SpriteComponent.js';
import { BulletComponent } from '../components/BulletComponent.js';
import { Sprite } from '@pixi/sprite';
import { Texture } from '@pixi/core';

export function createBullet(x, y, vx, vy, damage, ecs, attacker) {
  const bullet = ecs.createEntity();

  bullet.addComponent(new PositionComponent(x, y));
  bullet.addComponent(new VelocityComponent(vx, vy));
  bullet.addComponent(new BulletComponent(180, damage, attacker));

  const texture = Texture.from('assets/bullet.png');
  const sprite = new Sprite(texture || Texture.WHITE);
  sprite.width = 28;
  sprite.height = 14;
  sprite.anchor.set(0.5);

  bullet.addComponent(new SpriteComponent(sprite));

  const stage = ecs.stage || window.globalStage;
  if (stage) stage.addChild(sprite);
}
