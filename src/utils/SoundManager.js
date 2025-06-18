import { sound } from '@pixi/sound';

/**
 * Simple sound manager for playing preloaded SFX.
 */
export const SoundManager = {
  load() {
    sound.add('shoot', 'assets/sfx/shot.mp3');
    sound.add('explosion', 'assets/sfx/explosion.mp3');
  },

  /**
   * Play a sound by name
   * @param {string} name - Sound key (e.g. 'shoot', 'explosion')
   */
  play(name) {
    sound.play(name);
  }
};
