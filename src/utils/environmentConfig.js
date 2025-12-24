import * as THREE from 'three'

/**
 * Environment Configuration System
 * Defines procedural environment presets for different animal habitats
 */

// Environment presets with all visual properties
const environmentPresets = {
  forest: {
    groundColor: '#2d5016', // Dark green
    groundRoughness: 0.9,
    skyColor: '#87a8b0', // Soft blue-gray sky
    fogColor: '#4a6b5e', // Greenish fog
    fogNear: 5,
    fogFar: 30,
    ambientLightIntensity: 0.4,
    ambientLightColor: '#ffffff',
    directionalLightIntensity: 0.8,
    directionalLightColor: '#fff8e1', // Warm white
    directionalLightPosition: [5, 8, 5],
    secondaryLightIntensity: 0.2,
    secondaryLightColor: '#b3e5fc', // Light blue
    secondaryLightPosition: [-5, 3, -5],
    environmentPreset: 'forest', // For drei Environment component
  },
  grassland: {
    groundColor: '#7cb342', // Light green
    groundRoughness: 0.8,
    skyColor: '#87ceeb', // Sky blue
    fogColor: '#b0bec5', // Light gray fog
    fogNear: 10,
    fogFar: 50,
    ambientLightIntensity: 0.5,
    ambientLightColor: '#ffffff',
    directionalLightIntensity: 1.0,
    directionalLightColor: '#fffde7', // Bright yellow-white
    directionalLightPosition: [5, 10, 5],
    secondaryLightIntensity: 0.3,
    secondaryLightColor: '#fff9c4', // Soft yellow
    secondaryLightPosition: [-5, 3, -5],
    environmentPreset: 'sunset',
  },
  savannah: {
    groundColor: '#d4a574', // Warm yellow-brown
    groundRoughness: 0.7,
    skyColor: '#ffb347', // Warm orange sky
    fogColor: '#e8d5b7', // Light beige fog (minimal)
    fogNear: 20,
    fogFar: 100, // Very far, effectively no fog
    ambientLightIntensity: 0.6,
    ambientLightColor: '#fff8e1', // Warm white
    directionalLightIntensity: 1.2,
    directionalLightColor: '#ffeb3b', // Bright yellow sunlight
    directionalLightPosition: [5, 12, 5],
    secondaryLightIntensity: 0.4,
    secondaryLightColor: '#ffcc80', // Warm orange
    secondaryLightPosition: [-5, 4, -5],
    environmentPreset: 'sunset',
  },
  snow: {
    groundColor: '#f0f0f0', // White
    groundRoughness: 0.3, // Smooth, icy
    skyColor: '#b3d9ff', // Cool blue sky
    fogColor: '#e3f2fd', // Light blue fog
    fogNear: 3,
    fogFar: 25,
    ambientLightIntensity: 0.5,
    ambientLightColor: '#e1f5fe', // Cool blue-white
    directionalLightIntensity: 0.9,
    directionalLightColor: '#e3f2fd', // Cool blue-white
    directionalLightPosition: [5, 8, 5],
    secondaryLightIntensity: 0.3,
    secondaryLightColor: '#bbdefb', // Light blue
    secondaryLightPosition: [-5, 3, -5],
    environmentPreset: 'city',
  },
  farm: {
    groundColor: '#8d6e63', // Brown earth
    groundRoughness: 0.85,
    skyColor: '#90caf9', // Light blue sky
    fogColor: '#b0bec5', // Neutral gray fog
    fogNear: 8,
    fogFar: 40,
    ambientLightIntensity: 0.45,
    ambientLightColor: '#ffffff',
    directionalLightIntensity: 0.95,
    directionalLightColor: '#fff9c4', // Soft yellow
    directionalLightPosition: [5, 9, 5],
    secondaryLightIntensity: 0.25,
    secondaryLightColor: '#fffde7', // Warm white
    secondaryLightPosition: [-5, 3, -5],
    environmentPreset: 'sunset',
  },
  desert: {
    groundColor: '#d7ccc8', // Sandy beige
    groundRoughness: 0.6,
    skyColor: '#ffcc80', // Warm orange sky
    fogColor: '#efebe9', // Light beige fog
    fogNear: 15,
    fogFar: 80,
    ambientLightIntensity: 0.7,
    ambientLightColor: '#fff8e1', // Warm white
    directionalLightIntensity: 1.3,
    directionalLightColor: '#ffd54f', // Bright yellow
    directionalLightPosition: [5, 15, 5], // High sun
    secondaryLightIntensity: 0.5,
    secondaryLightColor: '#ffcc80', // Warm orange
    secondaryLightPosition: [-5, 4, -5],
    environmentPreset: 'sunset',
  },
}

/**
 * Get environment configuration for a given environment type
 * @param {string} environmentType - The type of environment (forest, grassland, etc.)
 * @returns {Object} Environment configuration object
 */
export function getEnvironmentConfig(environmentType) {
  // Return default (grassland) if type is invalid or missing
  const config = environmentPresets[environmentType] || environmentPresets.grassland

  // Convert color strings to THREE.Color objects for easier manipulation
  return {
    ...config,
    groundColor: new THREE.Color(config.groundColor),
    skyColor: new THREE.Color(config.skyColor),
    fogColor: new THREE.Color(config.fogColor),
    ambientLightColor: new THREE.Color(config.ambientLightColor),
    directionalLightColor: new THREE.Color(config.directionalLightColor),
    secondaryLightColor: new THREE.Color(config.secondaryLightColor),
  }
}

/**
 * Get all available environment types
 * @returns {string[]} Array of environment type names
 */
export function getAvailableEnvironmentTypes() {
  return Object.keys(environmentPresets)
}

export default environmentPresets

