/**
 * Represents a single game object with attached components.
 */
export class Entity {
  constructor(id) {
    this.id = id;
    this.components = new Map();
  }

  /**
   * Attaches a component to the entity.
   */
  addComponent(component) {
    this.components.set(component.constructor.name, component);
  }

  /**
   * Retrieves a component by name.
   */
  getComponent(componentName) {
    return this.components.get(componentName);
  }

  /**
   * Checks if this entity has a given component.
   */
  hasComponent(componentName) {
    return this.components.has(componentName);
  }

  /**
   * Removes a component from the entity.
   */
  removeComponent(componentName) {
    this.components.delete(componentName);
  }
}
