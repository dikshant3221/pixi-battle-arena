/**
 * Creates an enemy AI-controlled unit with health, attack, faction, and visual overlays.
 * @param {number} x - Initial X position
 * @param {number} y - Initial Y position
 * @param {Texture} texture - PIXI texture for the unit
 * @param {ECSManager} ecs - ECS manager instance
 * @param {string} mode - AI mode: 'seek', 'wander', 'patrol'
 * @param {number|null} targetId - Optional target entity ID
 * @returns {Entity}
 */
import { PositionComponent } from '../components/PositionComponent.js';
import { VelocityComponent } from '../components/VelocityComponent.js';
import { SpriteComponent } from '../components/SpriteComponent.js';
import { HealthComponent } from '../components/HealthComponent.js';
import { FactionComponent } from '../components/FactionComponent.js';
import { HealthBarComponent } from '../components/HealthBarComponent.js';
import { StatusEffectHUDComponent } from '../components/StatusEffectHUDComponent.js';
import { AIComponent } from '../components/AIComponent.js';
import { AttackComponent } from '../components/AttackComponent.js';
import { CooldownBarComponent } from '../components/CooldownBarComponent.js';
export function createAIUnit(x, y, texture, ecs, mode = 'seek', targetId = null) {
  const entity = ecs.createEntity();

  entity.addComponent(new PositionComponent(x, y));
  entity.addComponent(new VelocityComponent());
  entity.addComponent(new SpriteComponent(texture));
  entity.addComponent(new AIComponent(mode, targetId));
  entity.addComponent(new HealthComponent(100));
  entity.addComponent(new AttackComponent(10, 100));
  entity.addComponent(new FactionComponent('enemy'));
  entity.addComponent(new StatusEffectHUDComponent(entity.getComponent('SpriteComponent').sprite));

  const sprite = entity.getComponent('SpriteComponent').sprite;
  sprite.anchor.set(0.5);
  sprite.width = 48;
  sprite.height = 48;

  // Attach visual UI overlays
  entity.addComponent(new CooldownBarComponent(sprite));
  entity.addComponent(new HealthBarComponent(sprite));

  // Add to stage
  const stage = window.globalStage;
  if (stage) stage.addChild(sprite);

  return entity;
}
