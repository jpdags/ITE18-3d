import { useState, useEffect, useRef } from 'react'
import Scene from './components/Scene'
import UIControls from './components/UIControls'
import InfoPanel from './components/InfoPanel'
import GuidedLearningMode from './components/GuidedLearningMode'
import ComparisonMode from './components/ComparisonMode'
import animalsData from './data/animals.json'
import './App.css'

function App() {
  const [selectedAnimal, setSelectedAnimal] = useState(null)
  const [animals, setAnimals] = useState([])
  const [resetTrigger, setResetTrigger] = useState(0)
  const [isGuidedModeActive, setIsGuidedModeActive] = useState(false)
  const [isComparisonModeActive, setIsComparisonModeActive] = useState(false)
  const [comparisonAnimals, setComparisonAnimals] = useState([null, null])
  const cameraFocusRef = useRef(null)

  // Load animals data on mount
  useEffect(() => {
    setAnimals(animalsData.animals)
    // Set first animal as default selection
    if (animalsData.animals.length > 0) {
      setSelectedAnimal(animalsData.animals[0])
    }
  }, [])

  // Handle animal selection
  const handleAnimalSelect = (animal) => {
    setSelectedAnimal(animal)
    // Exit guided mode and comparison mode when switching animals
    setIsGuidedModeActive(false)
    setIsComparisonModeActive(false)
    setComparisonAnimals([null, null])
  }

  // Handle view reset
  const handleResetView = () => {
    setResetTrigger(prev => prev + 1)
  }

  // Handle guided learning mode toggle
  const handleToggleGuidedMode = () => {
    setIsGuidedModeActive(prev => !prev)
  }

  // Handle guided learning mode close
  const handleCloseGuidedMode = () => {
    setIsGuidedModeActive(false)
  }

  // Handle camera focus from guided learning
  const handleCameraFocus = (position, target) => {
    if (cameraFocusRef.current) {
      cameraFocusRef.current(position, target)
    }
  }

  // Handle comparison mode toggle
  const handleToggleComparisonMode = () => {
    setIsComparisonModeActive(prev => !prev)
    if (!isComparisonModeActive) {
      // Exit guided mode when entering comparison mode
      setIsGuidedModeActive(false)
    } else {
      // Clear comparison when exiting
      setComparisonAnimals([null, null])
    }
  }

  // Handle comparison animals selection
  const handleComparisonAnimalsSelect = (animal1, animal2) => {
    setComparisonAnimals([animal1, animal2])
    if (animal1 && animal2) {
      // Adjust camera for comparison view
      if (cameraFocusRef.current) {
        cameraFocusRef.current([0, 2.5, 10], [0, 0, 0])
      }
    }
  }

  // Handle comparison mode close
  const handleCloseComparisonMode = () => {
    setIsComparisonModeActive(false)
    setComparisonAnimals([null, null])
  }

  return (
    <div className="app-container">
      {/* 3D Scene */}
      <Scene 
        selectedAnimal={selectedAnimal} 
        resetTrigger={resetTrigger}
        onCameraFocusReady={cameraFocusRef}
        comparisonAnimals={isComparisonModeActive ? comparisonAnimals : null}
      />

      {/* UI Controls Overlay */}
      <UIControls
        animals={animals}
        selectedAnimal={selectedAnimal}
        onAnimalSelect={handleAnimalSelect}
        onResetView={handleResetView}
        onToggleGuidedMode={handleToggleGuidedMode}
        isGuidedModeActive={isGuidedModeActive}
        onToggleComparisonMode={handleToggleComparisonMode}
        isComparisonModeActive={isComparisonModeActive}
      />

      {/* Educational Info Panel - Hide in comparison mode */}
      {selectedAnimal && !isComparisonModeActive && (
        <InfoPanel animal={selectedAnimal} />
      )}

      {/* Guided Learning Mode */}
      <GuidedLearningMode
        animal={selectedAnimal}
        isActive={isGuidedModeActive && !isComparisonModeActive}
        onClose={handleCloseGuidedMode}
        onCameraFocus={handleCameraFocus}
      />

      {/* Comparison Mode */}
      <ComparisonMode
        animals={animals}
        isActive={isComparisonModeActive}
        onClose={handleCloseComparisonMode}
        onSelectAnimals={handleComparisonAnimalsSelect}
      />
    </div>
  )
}

export default App

