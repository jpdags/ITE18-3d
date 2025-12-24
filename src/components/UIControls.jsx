import { useState } from 'react'
import './UIControls.css'

/**
 * UIControls Component
 * Provides animal selection interface and view reset functionality
 */
function UIControls({ 
  animals, 
  selectedAnimal, 
  onAnimalSelect, 
  onResetView,
  onToggleGuidedMode,
  isGuidedModeActive,
  onToggleComparisonMode,
  isComparisonModeActive
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleAnimalClick = (animal) => {
    onAnimalSelect(animal)
    setIsExpanded(false)
  }

  const handleResetView = () => {
    if (onResetView) {
      onResetView()
    }
  }

  const handleToggleGuidedMode = () => {
    if (onToggleGuidedMode) {
      onToggleGuidedMode()
    }
  }

  const handleToggleComparisonMode = () => {
    if (onToggleComparisonMode) {
      onToggleComparisonMode()
    }
  }

  const hasGuidedLearning = selectedAnimal?.guidedLearningSteps?.length > 0

  return (
    <div className="ui-controls">
      {/* Main Control Panel */}
      <div className="control-panel">
        <h2 className="app-title">3D Animal Explorer</h2>
        
        {/* Animal Selection Dropdown */}
        <div className="animal-selector">
          <button
            className="selector-button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label="Select Animal"
          >
            <span className="selector-label">
              {selectedAnimal ? selectedAnimal.name : 'Select Animal'}
            </span>
            <span className={`arrow ${isExpanded ? 'expanded' : ''}`}>▼</span>
          </button>

          {isExpanded && (
            <div className="animal-list">
              {animals.map((animal) => (
                <button
                  key={animal.id}
                  className={`animal-option ${
                    selectedAnimal?.id === animal.id ? 'active' : ''
                  }`}
                  onClick={() => handleAnimalClick(animal)}
                >
                  {animal.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Quick Animal Buttons */}
        <div className="quick-select">
          <p className="quick-select-label">Quick Select:</p>
          <div className="animal-buttons">
            {animals.slice(0, 6).map((animal) => (
              <button
                key={animal.id}
                className={`animal-button ${
                  selectedAnimal?.id === animal.id ? 'active' : ''
                }`}
                onClick={() => handleAnimalClick(animal)}
                title={animal.name}
              >
                {animal.name.charAt(0)}
              </button>
            ))}
          </div>
        </div>

        {/* Guided Learning Mode Button */}
        {hasGuidedLearning && !isComparisonModeActive && (
          <button 
            className={`guided-mode-button ${isGuidedModeActive ? 'active' : ''}`}
            onClick={handleToggleGuidedMode}
            title="Start Guided Learning Mode"
          >
            <span className="guided-mode-icon">📚</span>
            {isGuidedModeActive ? 'Exit Guide' : 'Guided Learning'}
          </button>
        )}

        {/* Comparison Mode Button */}
        <button 
          className={`comparison-mode-button ${isComparisonModeActive ? 'active' : ''}`}
          onClick={handleToggleComparisonMode}
          title="Compare Two Animals"
        >
          <span className="comparison-mode-icon">⚖️</span>
          {isComparisonModeActive ? 'Exit Compare' : 'Compare Animals'}
        </button>

        {/* Reset View Button */}
        <button className="reset-button" onClick={handleResetView}>
          <span className="reset-icon">↺</span>
          Reset View
        </button>
      </div>

      {/* Instructions */}
      <div className="instructions">
        <p>🖱️ Click & Drag to Rotate</p>
        <p>🔍 Scroll to Zoom</p>
        <p>👆 Click on Animal Parts</p>
      </div>
    </div>
  )
}

export default UIControls

