import { Entity } from './Entity.js';

/**
 * Manages all entities and systems in the ECS architecture.
 */
export class ECSManager {
  constructor() {
    this.entities = new Map();
    this.systems = [];
    this.nextEntityId = 0;
  }

  /**
   * Creates a new entity and adds it to the registry.
   */
  createEntity() {
    const entity = new Entity(this.nextEntityId++);
    this.entities.set(entity.id, entity);
    return entity;
  }

  /**
   * Adds a system to be updated each frame.
   */
  addSystem(system) {
    this.systems.push(system);
  }

  /**
   * Calls update() on all systems.
   */
  update(delta) {
    for (const system of this.systems) {
      system.update(delta);
    }
  }
}
