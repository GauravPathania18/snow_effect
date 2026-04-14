/**
 * Central configuration for UIEffects
 * Contains constants and default settings
 */

export const EFFECT_MODES = {
  CALM: 'calm',
  WINDY: 'windy',
  BLIZZARD: 'blizzard'
};

export const WIND_MODES = {
  [EFFECT_MODES.CALM]: {
    windStrength: 4,
    windEffect: 0.6,
    gravity: 16,
    description: 'Gentle, peaceful snowfall'
  },
  [EFFECT_MODES.WINDY]: {
    windStrength: 14,
    windEffect: 1.8,
    gravity: 18,
    description: 'Moderate wind with swaying motion'
  },
  [EFFECT_MODES.BLIZZARD]: {
    windStrength: 28,
    windEffect: 4.0,
    gravity: 25,
    swingAmplitude: 1.6,
    description: 'Intense blizzard with chaotic motion'
  }
};

export const SNOW_EFFECT_CONFIG = {
  maxFlakes: 2000,
  gravity: 18,
  windStrength: 16,
  windEffect: 2.0,
  swingAmplitude: 1.0,
  fpsUpdateInterval: 1000,
  fpsThresholdLow: 30,
  fpsThresholdHigh: 50
};

export const UI_CONFIG = {
  BUTTON_ID: 'ui-snow-button',
  BUTTON_CLASS: 'ui-snow-button',
  STORAGE_KEY: 'ui-snow',
  CONTROLS_ID: 'snow-controls',
  WIND_CONTROL_SELECTOR: '#snow-controls button'
};

export const MESSAGES = {
  SNOW_ON: '❄ Stop snow',
  SNOW_OFF: '❄ Let it snow',
  ARIA_LABEL: 'Toggle snow effect'
};
