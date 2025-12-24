import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Suspense, useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import AnimalModel from './AnimalModel'
import EnvironmentRenderer from './EnvironmentRenderer'
import './Scene.css'

/**
 * Camera Controller Component
 * Handles smooth camera transitions when switching animals and guided learning focus
 */
function CameraController({ selectedAnimal, resetTrigger, onCameraFocusReady, isComparisonMode }) {
  const { camera } = useThree()
  const controlsRef = useRef()
  const targetPosition = useRef([0, 2, 8])
  const targetLookAt = useRef([0, 0, 0])
  const isTransitioning = useRef(false)

  // Adjust camera for comparison mode
  useEffect(() => {
    if (isComparisonMode) {
      targetPosition.current = [0, 2.5, 10]
      targetLookAt.current = [0, 0, 0]
      isTransitioning.current = true
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0, 0)
      }
    } else {
      targetPosition.current = [0, 2, 8]
      targetLookAt.current = [0, 0, 0]
      isTransitioning.current = true
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0, 0)
      }
    }
  }, [isComparisonMode])

  // Expose camera focus function to parent
  useEffect(() => {
    if (onCameraFocusReady) {
      onCameraFocusReady.current = (position, lookAt) => {
        targetPosition.current = position
        targetLookAt.current = lookAt || [0, 0, 0]
        isTransitioning.current = true
        
        // Immediately set orbit controls target to start transition
        if (controlsRef.current) {
          const [lx, ly, lz] = targetLookAt.current
          controlsRef.current.target.set(lx, ly, lz)
        }
      }
    }
  }, [onCameraFocusReady])

  useEffect(() => {
    // Reset camera position only when reset is triggered (not on animal change)
    targetPosition.current = [0, 2, 8]
    targetLookAt.current = [0, 0, 0]
    isTransitioning.current = true
    
    // Reset orbit controls target
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0)
    }
  }, [resetTrigger]) // Only depend on resetTrigger, not selectedAnimal

  useFrame((state, delta) => {
    if (isTransitioning.current) {
      const [tx, ty, tz] = targetPosition.current
      const [lx, ly, lz] = targetLookAt.current
      const lerpFactor = 0.08 // Slightly faster for better responsiveness
      const targetPos = new THREE.Vector3(tx, ty, tz)
      const targetLook = new THREE.Vector3(lx, ly, lz)

      // Smoothly move camera position
      camera.position.lerp(targetPos, lerpFactor)

      // Smoothly update orbit controls target (look at point)
      if (controlsRef.current) {
        const currentTarget = controlsRef.current.target
        currentTarget.lerp(targetLook, lerpFactor)
        
        // Update controls to reflect the new target
        controlsRef.current.update()
        
        // Ensure camera is looking at the target
        camera.lookAt(currentTarget)
      }

      // Check if close enough to target
      const distance = camera.position.distanceTo(targetPos)
      const lookDistance = controlsRef.current?.target.distanceTo(targetLook) || 0
      
      if (distance < 0.15 && lookDistance < 0.15) {
        isTransitioning.current = false
        // Ensure final position and orientation are exact
        camera.position.copy(targetPos)
        if (controlsRef.current) {
          controlsRef.current.target.copy(targetLook)
          controlsRef.current.update()
          // Force camera to look at target after controls update
          camera.lookAt(targetLook)
        }
      }
    }
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />
      <OrbitControls
        ref={controlsRef}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={15}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        autoRotate={false}
      />
    </>
  )
}

/**
 * Scene Component
 * Main 3D canvas container with lighting, environment, and camera controls
 */
function Scene({ selectedAnimal, resetTrigger, onCameraFocusReady, comparisonAnimals }) {
  const isComparisonMode = comparisonAnimals && comparisonAnimals[0] && comparisonAnimals[1]
  
  return (
    <div className="scene-container">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        {/* Camera Controller with smooth transitions */}
        <CameraController 
          selectedAnimal={selectedAnimal} 
          resetTrigger={resetTrigger}
          onCameraFocusReady={onCameraFocusReady}
          isComparisonMode={isComparisonMode}
        />

        {/* Dynamic Environment Renderer - handles lighting, ground, fog, and sky */}
        <EnvironmentRenderer 
          environmentType={
            isComparisonMode 
              ? comparisonAnimals[0]?.environmentType 
              : selectedAnimal?.environmentType
          } 
        />

        {/* Animal Model(s) with loading fallback */}
        <Suspense fallback={null}>
          {isComparisonMode ? (
            // Comparison Mode: Two animals side-by-side
            <>
              <group position={[-3, 0, 0]}>
                <AnimalModel
                  modelPath={comparisonAnimals[0].modelPath}
                  animalId={comparisonAnimals[0].id}
                />
              </group>
              <group position={[3, 0, 0]}>
                <AnimalModel
                  modelPath={comparisonAnimals[1].modelPath}
                  animalId={comparisonAnimals[1].id}
                />
              </group>
            </>
          ) : (
            // Normal Mode: Single animal
            selectedAnimal && (
              <AnimalModel
                modelPath={selectedAnimal.modelPath}
                animalId={selectedAnimal.id}
              />
            )
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Scene

