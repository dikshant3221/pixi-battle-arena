export class GameLoop {
  constructor(systems = []) {
    this.systems = systems;
  }

  update(delta) {
    for (const system of this.systems) {
      system.update(delta);
    }
  }
}
