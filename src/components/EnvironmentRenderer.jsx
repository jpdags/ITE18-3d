import { useRef, useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'
import { getEnvironmentConfig } from '../utils/environmentConfig'

/**
 * EnvironmentRenderer Component
 * Dynamically renders and transitions between different environment presets
 * based on the selected animal's habitat
 */
function EnvironmentRenderer({ environmentType }) {
  const { scene } = useThree()
  
  // Get target environment configuration
  const targetConfig = useMemo(
    () => getEnvironmentConfig(environmentType || 'grassland'),
    [environmentType]
  )

  // Refs to track current values for smooth transitions
  const currentValues = useRef({
    groundColor: new THREE.Color(targetConfig.groundColor),
    groundRoughness: targetConfig.groundRoughness,
    skyColor: new THREE.Color(targetConfig.skyColor),
    fogColor: new THREE.Color(targetConfig.fogColor),
    fogNear: targetConfig.fogNear,
    fogFar: targetConfig.fogFar,
    ambientLightIntensity: targetConfig.ambientLightIntensity,
    ambientLightColor: new THREE.Color(targetConfig.ambientLightColor),
    directionalLightIntensity: targetConfig.directionalLightIntensity,
    directionalLightColor: new THREE.Color(targetConfig.directionalLightColor),
    directionalLightPosition: [...targetConfig.directionalLightPosition],
    secondaryLightIntensity: targetConfig.secondaryLightIntensity,
    secondaryLightColor: new THREE.Color(targetConfig.secondaryLightColor),
    secondaryLightPosition: [...targetConfig.secondaryLightPosition],
  })

  // Refs for lights and ground mesh
  const ambientLightRef = useRef()
  const directionalLightRef = useRef()
  const secondaryLightRef = useRef()
  const groundMeshRef = useRef()

  // Update target values when environment type changes
  useEffect(() => {
    // Target values are already set in targetConfig
    // The transition will happen in useFrame
  }, [targetConfig])

  // Smoothly transition environment properties
  useFrame(() => {
    const lerpFactor = 0.05 // Smooth transition speed

    // Transition ground color
    currentValues.current.groundColor.lerp(targetConfig.groundColor, lerpFactor)
    if (groundMeshRef.current) {
      groundMeshRef.current.material.color.copy(currentValues.current.groundColor)
    }

    // Transition ground roughness
    currentValues.current.groundRoughness = THREE.MathUtils.lerp(
      currentValues.current.groundRoughness,
      targetConfig.groundRoughness,
      lerpFactor
    )
    if (groundMeshRef.current) {
      groundMeshRef.current.material.roughness = currentValues.current.groundRoughness
    }

    // Transition sky/background color
    currentValues.current.skyColor.lerp(targetConfig.skyColor, lerpFactor)
    scene.background = currentValues.current.skyColor.clone()

    // Transition fog
    currentValues.current.fogColor.lerp(targetConfig.fogColor, lerpFactor)
    if (scene.fog) {
      scene.fog.color.copy(currentValues.current.fogColor)
      scene.fog.near = THREE.MathUtils.lerp(
        scene.fog.near,
        targetConfig.fogNear,
        lerpFactor
      )
      scene.fog.far = THREE.MathUtils.lerp(
        scene.fog.far,
        targetConfig.fogFar,
        lerpFactor
      )
    }

    // Transition ambient light
    if (ambientLightRef.current) {
      currentValues.current.ambientLightIntensity = THREE.MathUtils.lerp(
        currentValues.current.ambientLightIntensity,
        targetConfig.ambientLightIntensity,
        lerpFactor
      )
      currentValues.current.ambientLightColor.lerp(
        targetConfig.ambientLightColor,
        lerpFactor
      )
      ambientLightRef.current.intensity = currentValues.current.ambientLightIntensity
      ambientLightRef.current.color.copy(currentValues.current.ambientLightColor)
    }

    // Transition directional light
    if (directionalLightRef.current) {
      currentValues.current.directionalLightIntensity = THREE.MathUtils.lerp(
        currentValues.current.directionalLightIntensity,
        targetConfig.directionalLightIntensity,
        lerpFactor
      )
      currentValues.current.directionalLightColor.lerp(
        targetConfig.directionalLightColor,
        lerpFactor
      )
      directionalLightRef.current.intensity = currentValues.current.directionalLightIntensity
      directionalLightRef.current.color.copy(currentValues.current.directionalLightColor)
      
      // Transition light position
      const [tx, ty, tz] = targetConfig.directionalLightPosition
      currentValues.current.directionalLightPosition[0] = THREE.MathUtils.lerp(
        currentValues.current.directionalLightPosition[0],
        tx,
        lerpFactor
      )
      currentValues.current.directionalLightPosition[1] = THREE.MathUtils.lerp(
        currentValues.current.directionalLightPosition[1],
        ty,
        lerpFactor
      )
      currentValues.current.directionalLightPosition[2] = THREE.MathUtils.lerp(
        currentValues.current.directionalLightPosition[2],
        tz,
        lerpFactor
      )
      directionalLightRef.current.position.set(
        currentValues.current.directionalLightPosition[0],
        currentValues.current.directionalLightPosition[1],
        currentValues.current.directionalLightPosition[2]
      )
    }

    // Transition secondary light
    if (secondaryLightRef.current) {
      currentValues.current.secondaryLightIntensity = THREE.MathUtils.lerp(
        currentValues.current.secondaryLightIntensity,
        targetConfig.secondaryLightIntensity,
        lerpFactor
      )
      currentValues.current.secondaryLightColor.lerp(
        targetConfig.secondaryLightColor,
        lerpFactor
      )
      secondaryLightRef.current.intensity = currentValues.current.secondaryLightIntensity
      secondaryLightRef.current.color.copy(currentValues.current.secondaryLightColor)
      
      // Transition secondary light position
      const [tx, ty, tz] = targetConfig.secondaryLightPosition
      currentValues.current.secondaryLightPosition[0] = THREE.MathUtils.lerp(
        currentValues.current.secondaryLightPosition[0],
        tx,
        lerpFactor
      )
      currentValues.current.secondaryLightPosition[1] = THREE.MathUtils.lerp(
        currentValues.current.secondaryLightPosition[1],
        ty,
        lerpFactor
      )
      currentValues.current.secondaryLightPosition[2] = THREE.MathUtils.lerp(
        currentValues.current.secondaryLightPosition[2],
        tz,
        lerpFactor
      )
      secondaryLightRef.current.position.set(
        currentValues.current.secondaryLightPosition[0],
        currentValues.current.secondaryLightPosition[1],
        currentValues.current.secondaryLightPosition[2]
      )
    }
  })

  // Initialize fog
  useEffect(() => {
    if (!scene.fog) {
      scene.fog = new THREE.Fog(
        targetConfig.fogColor,
        targetConfig.fogNear,
        targetConfig.fogFar
      )
    }
  }, [scene, targetConfig])

  return (
    <>
      {/* Ambient Light */}
      <ambientLight
        ref={ambientLightRef}
        intensity={targetConfig.ambientLightIntensity}
        color={targetConfig.ambientLightColor}
      />

      {/* Main Directional Light */}
      <directionalLight
        ref={directionalLightRef}
        position={targetConfig.directionalLightPosition}
        intensity={targetConfig.directionalLightIntensity}
        color={targetConfig.directionalLightColor}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Secondary Directional Light */}
      <directionalLight
        ref={secondaryLightRef}
        position={targetConfig.secondaryLightPosition}
        intensity={targetConfig.secondaryLightIntensity}
        color={targetConfig.secondaryLightColor}
      />

      {/* Ground Plane */}
      <mesh
        ref={groundMeshRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.5, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color={targetConfig.groundColor}
          roughness={targetConfig.groundRoughness}
        />
      </mesh>

      {/* Environment for realistic reflections */}
      <Environment preset={targetConfig.environmentPreset} />
    </>
  )
}

export default EnvironmentRenderer

