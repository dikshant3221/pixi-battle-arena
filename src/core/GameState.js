/**
 * Holds shared global game state used across systems.
 */
export const GameState = {
  score: 0,          // Player score
  lives: 3,          // Player lives
  isGameOver: false, // Game end flag
  isWin: false,      // Win flag
  currentWave: 0,    // Current wave index
  player: null,      // Reference to the player entity
  waveManager: null, // Reference to the wave manager
};

// ✅ Sample win trigger logic (used elsewhere)
if (GameState.score >= 1000) {
  alert("You Win!");
  GameState.isGameOver = true;
}
