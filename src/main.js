// Import core application, game loop, and ECS setup
import { Application } from './core/Application.js';
import { GameLoop } from './core/GameLoop.js';
import { ECSManager } from './core/ECSManager.js';
import { WaveManager } from './core/WaveManager.js';
import { ParticleManager } from './core/ParticleManager.js';

// Import game state and PIXI tools
import { GameState } from './core/GameState.js';
import { SoundManager } from './utils/SoundManager.js';
import { setupPauseUI } from './ui/PauseOverlay.js';

// Import PIXI display tools
import { Text } from '@pixi/text';
import { Texture } from '@pixi/core';
import { Sprite } from '@pixi/sprite';

// Import ECS components
import { PositionComponent } from './components/PositionComponent.js';
import { VelocityComponent } from './components/VelocityComponent.js';
import { SpriteComponent } from './components/SpriteComponent.js';
import { HealthComponent } from './components/HealthComponent.js';
import { FactionComponent } from './components/FactionComponent.js';
import { HealthBarComponent } from './components/HealthBarComponent.js';
import { StatusEffectHUDComponent } from './components/StatusEffectHUDComponent.js';

// Import ECS systems
import { MovementSystem } from './systems/MovementSystem.js';
import { RenderSystem } from './systems/RenderSystem.js';
import { CollisionSystem } from './systems/CollisionSystem.js';
import { HealthSystem } from './systems/HealthSystem.js';
import { AISystem } from './systems/AISystem.js';
import { AttackSystem } from './systems/AttackSystem.js';
import { BulletSystem } from './systems/BulletSystem.js';
import { ExplosionEffectSystem } from './systems/ExplosionEffectSystem.js';
import { HealthBarSystem } from './systems/HealthBarSystem.js';
import { PlayerInputSystem } from './systems/PlayerInputSystem.js';
import { PlayerMovementSystem } from './systems/PlayerMovementSystem.js';
import { DoTSystem } from './systems/DoTSystem.js';

import { createAIUnit } from './utils/createAIUnit.js';

// --- Game Initialization ---

// Create PIXI application and ECS instance
const app = new Application();
const ecs = new ECSManager();
window.globalStage = app.stage; // expose stage globally if needed

// Load game sound effects
SoundManager.load();

// Display pause UI overlay (ESC to toggle)
setupPauseUI(app);

// --- HUD Setup ---

const scoreText = new Text('Score: 0', { fontSize: 30, fill: 0xffffff });
scoreText.x = 10;
scoreText.y = 10;

const livesText = new Text('Lives: 3', { fontSize: 30, fill: 0xffffff });
livesText.x = 10;
livesText.y = 50;

const statusText = new Text('', { fontSize: 50, fill: 0xffff00 });
statusText.anchor.set(0.5);
statusText.x = app.app.screen.width / 2;
statusText.y = app.app.screen.height / 2;

// Add all HUD elements to the stage
app.stage.addChild(scoreText, livesText, statusText);

// Load background image
const background = Sprite.from('assets/background.png');
background.anchor.set(0);
background.zIndex = 0;
app.stage.addChildAt(background, 0);
background.width = app.app.screen.width;
background.height = app.app.screen.height;

// --- Unit Factory: Create player or enemy entities ---
function createUnit(x, y, vx, vy, texture, ecs, stage) {
  const entity = ecs.createEntity();
  entity.addComponent(new PositionComponent(x, y));
  entity.addComponent(new VelocityComponent(vx, vy));
  entity.addComponent(new SpriteComponent(texture));
  entity.addComponent(new HealthComponent(100));
  entity.addComponent(new FactionComponent('player'));
  entity.addComponent(new StatusEffectHUDComponent(entity.getComponent('SpriteComponent').sprite));

  const sprite = entity.getComponent('SpriteComponent').sprite;
  sprite.anchor.set(0.5);
  sprite.width = 48;
  sprite.height = 48;

  stage.addChild(sprite);
  return entity;
}

// --- HUD Update Helpers ---
function updateHUD() {
  scoreText.text = `Score: ${GameState.score}`;
  livesText.text = `Lives: ${GameState.lives}`;
  statusText.text = GameState.isGameOver
    ? "💀 Mission Failed! Try Again."
    : GameState.isWin
    ? "🏆 🔥 Mission Complete! Well done!"
    : "";
}

const restartBtn = document.getElementById('restartBtn');
restartBtn.onclick = () => window.location.reload();

function checkGameEnd() {
  if (GameState.isGameOver || GameState.isWin) {
    restartBtn.textContent = GameState.isWin ? "Play Again?" : "Try Again?";
    restartBtn.style.display = 'block';
  }
}

// --- Game Launch ---
(async () => {
  // Create initial player and enemy entities
  const player = createUnit(1000, 500, 0, 0, Texture.from('assets/soldier.png'), ecs, app.stage);
  const enemy = createAIUnit(100, 100, Texture.from('assets/enemy.png'), ecs, 'seek', player.id);
  const patroller = createAIUnit(100, 100, Texture.from('assets/enemy.png'), ecs, 'patrol');

  // Optional: assign patrol points
  patroller.getComponent('AIComponent').patrolPoints = [
    { x: 100, y: 100 },
    { x: 800, y: 300 }
  ];

  // Add overlays to player/enemy
  player.addComponent(new HealthBarComponent(player.getComponent('SpriteComponent').sprite));
  player.addComponent(new StatusEffectHUDComponent(player.getComponent('SpriteComponent').sprite));
  enemy.addComponent(new HealthBarComponent(enemy.getComponent('SpriteComponent').sprite));

  GameState.player = player;
  GameState.waveManager = new WaveManager(app.stage, ecs, null);
  GameState.waveManager.start();

  // Display current wave text on top right
  const waveText = new Text('', { fontSize: 30, fill: 0xffffff });
  waveText.y = 10;
  app.stage.addChild(waveText);

  // Particle system for explosions
  const fxManager = new ParticleManager(app.stage);
  app.ticker.add(() => fxManager.update());

  // Register systems in ECS
  ecs.addSystem(new CollisionSystem(ecs.entities));
  ecs.addSystem(new AttackSystem(ecs.entities));
  ecs.addSystem(new BulletSystem(ecs.entities, ecs, app.stage, fxManager));
  ecs.addSystem(new HealthSystem(ecs.entities, player, ecs));
  ecs.addSystem(new RenderSystem(ecs.entities));
  ecs.addSystem(new ExplosionEffectSystem(ecs.entities));
  ecs.addSystem(new HealthBarSystem(ecs.entities));
  ecs.addSystem(new PlayerInputSystem(ecs.entities, ecs, app.stage, null, app.renderer));
  ecs.addSystem(new PlayerMovementSystem(ecs.entities));
  ecs.addSystem(new MovementSystem(ecs.entities));
  ecs.addSystem(new AISystem(ecs.entities, ecs));
  ecs.addSystem(new DoTSystem(ecs.entities));

  // Start game loop
  const loop = new GameLoop(ecs.systems);
  app.ticker.add((delta) => {
    GameState.waveManager.update(delta);
    waveText.text = GameState.waveManager.getWaveProgressText();
    waveText.x = app.app.screen.width - 20 - waveText.width;

    if (!GameState.isGameOver && !GameState.isWin) {
      loop.update(delta);
    }

    updateHUD();
    checkGameEnd();
  });
})();

// --- Responsive resizing for canvas and background ---
window.addEventListener('resize', () => {
  const w = window.innerWidth - 20;
  const h = window.innerHeight - 21;

  app.app.renderer.resize(w, h);
  background.width = w;
  background.height = h;

  statusText.x = w / 2;
  statusText.y = h / 2;
});
window.dispatchEvent(new Event('resize'));

// --- Prevent page scrolling from arrow keys / mouse wheel ---
window.addEventListener('keydown', (e) => {
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
    e.preventDefault();
  }
}, { passive: false });

window.addEventListener('wheel', (e) => {
  e.preventDefault();
}, { passive: false });
