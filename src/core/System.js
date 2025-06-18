/**
 * Base class for all ECS systems.
 * Systems are responsible for updating logic based on components.
 */
export class System {
  constructor(entities) {
    this.entities = entities; // Map of all active entities
  }

  /**
   * Override this method in child systems.
   */
  update(delta) {}
}
