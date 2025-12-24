import { useRef, useEffect, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * AnimalModel Component
 * Loads and displays GLB models with interaction capabilities
 * Supports body part highlighting and idle animations
 */
function AnimalModel({ modelPath, animalId }) {
  const groupRef = useRef()
  const { scene, animations } = useGLTF(modelPath)
  const { actions } = useAnimations(animations, groupRef)
  const [hoveredPart, setHoveredPart] = useState(null)
  const clonedSceneRef = useRef(null)

  // Clone the scene once to avoid conflicts with multiple instances
  useEffect(() => {
    if (scene && !clonedSceneRef.current) {
      clonedSceneRef.current = scene.clone()
      
      // Center and scale the model appropriately
      const box = new THREE.Box3().setFromObject(clonedSceneRef.current)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 2 / maxDim // Scale to fit in a 2-unit space

      clonedSceneRef.current.scale.multiplyScalar(scale)
      clonedSceneRef.current.position.sub(center.multiplyScalar(scale))
    }
    
    return () => {
      // Cleanup cloned scene when component unmounts
      if (clonedSceneRef.current) {
        clonedSceneRef.current.traverse((child) => {
          if (child.isMesh) {
            child.geometry?.dispose()
            if (Array.isArray(child.material)) {
              child.material.forEach(mat => mat.dispose())
            } else {
              child.material?.dispose()
            }
          }
        })
        clonedSceneRef.current = null
      }
    }
  }, [scene])

  // Set up idle animation if available
  useEffect(() => {
    if (animations.length > 0 && actions) {
      // Try to find idle, breathing, or first animation
      const idleAction = actions[Object.keys(actions)[0]]
      if (idleAction) {
        idleAction.reset().fadeIn(0.5).play()
        return () => {
          idleAction.fadeOut(0.5)
        }
      }
    }
  }, [animations, actions])

  // Add subtle breathing/idle motion even without animations
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle vertical breathing motion
      const breathingOffset = Math.sin(state.clock.elapsedTime * 0.5) * 0.02
      groupRef.current.position.y = breathingOffset

      // Gentle rotation for exploration
      if (!hoveredPart) {
        groupRef.current.rotation.y += 0.001
      }
    }
  })

  // Set up raycasting for body part interaction
  useEffect(() => {
    if (!clonedSceneRef.current) return

    // Traverse the model and add interaction capabilities
    clonedSceneRef.current.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true

        // Make meshes interactive
        child.userData.interactive = true
      }
    })
  }, [clonedSceneRef.current])

  // Highlight effect on hover
  useEffect(() => {
    if (!clonedSceneRef.current) return

    clonedSceneRef.current.traverse((child) => {
      if (child.isMesh) {
        if (hoveredPart) {
          // Add subtle highlight
          if (!child.material.emissive) {
            child.material.emissive = new THREE.Color(0x000000)
          }
          child.material.emissive.setHex(0x222222)
          child.material.emissiveIntensity = 0.3
        } else {
          if (child.material.emissive) {
            child.material.emissive.setHex(0x000000)
            child.material.emissiveIntensity = 0
          }
        }
      }
    })
  }, [hoveredPart])

  // Handle pointer events for highlighting
  const handlePointerOver = (event) => {
    event.stopPropagation()
    setHoveredPart(event.object.name || 'body')
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = () => {
    setHoveredPart(null)
    document.body.style.cursor = 'auto'
  }

  if (!clonedSceneRef.current) return null

  return (
    <group 
      ref={groupRef} 
      dispose={null}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <primitive object={clonedSceneRef.current} />
    </group>
  )
}

// Preload models for better performance
useGLTF.preload = (path) => {
  // This will be called to preload models
}

export default AnimalModel

