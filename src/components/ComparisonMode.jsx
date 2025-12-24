import { useState, useEffect } from 'react'
import './ComparisonMode.css'

/**
 * ComparisonMode Component
 * Allows users to compare two animals side-by-side
 */
function ComparisonMode({ 
  animals, 
  isActive, 
  onClose, 
  onSelectAnimals 
}) {
  const [animal1, setAnimal1] = useState(null)
  const [animal2, setAnimal2] = useState(null)
  const [showSelector, setShowSelector] = useState(true)

  // Reset when mode is closed
  useEffect(() => {
    if (!isActive) {
      setAnimal1(null)
      setAnimal2(null)
      setShowSelector(true)
    }
  }, [isActive])

  if (!isActive) return null

  const handleAnimal1Select = (animal) => {
    const newAnimal1 = animal
    setAnimal1(newAnimal1)
    if (animal2 && newAnimal1.id !== animal2.id) {
      setShowSelector(false)
      onSelectAnimals(newAnimal1, animal2)
    }
  }

  const handleAnimal2Select = (animal) => {
    const newAnimal2 = animal
    setAnimal2(newAnimal2)
    if (animal1 && newAnimal2.id !== animal1.id) {
      setShowSelector(false)
      onSelectAnimals(animal1, newAnimal2)
    }
  }

  const handleStartComparison = () => {
    if (animal1 && animal2) {
      setShowSelector(false)
      onSelectAnimals(animal1, animal2)
    }
  }

  const handleReset = () => {
    setAnimal1(null)
    setAnimal2(null)
    setShowSelector(true)
    onSelectAnimals(null, null)
  }

  const handleClose = () => {
    handleReset()
    if (onClose) {
      onClose()
    }
  }

  // Comparison data
  const getComparisonData = () => {
    if (!animal1 || !animal2) return null

    return {
      habitat: {
        same: animal1.habitat === animal2.habitat,
        value1: animal1.habitat,
        value2: animal2.habitat
      },
      diet: {
        same: animal1.diet === animal2.diet,
        value1: animal1.diet,
        value2: animal2.diet
      },
      environment: {
        same: animal1.environmentType === animal2.environmentType,
        value1: animal1.environmentType,
        value2: animal2.environmentType
      },
      size: {
        same: animal1.size === animal2.size,
        value1: animal1.size,
        value2: animal2.size
      }
    }
  }

  const comparison = getComparisonData()

  return (
    <div className="comparison-mode-overlay">
      {/* Animal Selector */}
      {showSelector && (
        <div className="comparison-selector">
          <div className="comparison-selector-header">
            <h3>Select Animals to Compare</h3>
            <button className="comparison-close-btn" onClick={handleClose}>×</button>
          </div>
          
          <div className="comparison-selection">
            <div className="comparison-selection-panel">
              <h4>Animal 1</h4>
              <div className="comparison-animal-list">
                {animals.map((animal) => (
                  <button
                    key={animal.id}
                    className={`comparison-animal-btn ${
                      animal1?.id === animal.id ? 'selected' : ''
                    }`}
                    onClick={() => handleAnimal1Select(animal)}
                  >
                    {animal.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="comparison-selection-panel">
              <h4>Animal 2</h4>
              <div className="comparison-animal-list">
                {animals.map((animal) => (
                  <button
                    key={animal.id}
                    className={`comparison-animal-btn ${
                      animal2?.id === animal.id ? 'selected' : ''
                    }`}
                    onClick={() => handleAnimal2Select(animal)}
                    disabled={animal1?.id === animal.id}
                  >
                    {animal.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="comparison-actions">
            <button 
              className="comparison-start-btn"
              onClick={handleStartComparison}
              disabled={!animal1 || !animal2}
            >
              Start Comparison
            </button>
            <button 
              className="comparison-cancel-btn"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Comparison View */}
      {!showSelector && animal1 && animal2 && (
        <div className="comparison-view">
          <div className="comparison-header">
            <h3>Comparing Animals</h3>
            <div className="comparison-header-actions">
              <button className="comparison-reset-btn" onClick={handleReset}>
                Change Animals
              </button>
              <button className="comparison-close-btn" onClick={handleClose}>×</button>
            </div>
          </div>

          <div className="comparison-content">
            {/* Animal 1 Info */}
            <div className="comparison-panel">
              <h4 className="comparison-animal-name">{animal1.name}</h4>
              <p className="comparison-scientific">{animal1.scientificName}</p>
              
              <div className="comparison-details">
                <div className="comparison-detail-item">
                  <span className="comparison-label">Habitat:</span>
                  <span className="comparison-value">{animal1.habitat}</span>
                </div>
                <div className="comparison-detail-item">
                  <span className="comparison-label">Diet:</span>
                  <span className="comparison-value">{animal1.diet}</span>
                </div>
                <div className="comparison-detail-item">
                  <span className="comparison-label">Size:</span>
                  <span className="comparison-value">{animal1.size}</span>
                </div>
                <div className="comparison-detail-item">
                  <span className="comparison-label">Environment:</span>
                  <span className="comparison-value">{animal1.environmentType}</span>
                </div>
              </div>

              <div className="comparison-traits">
                <h5>Key Traits:</h5>
                <ul>
                  {animal1.traits.map((trait, index) => (
                    <li key={index}>{trait}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Comparison Highlights */}
            <div className="comparison-center">
              <div className="comparison-vs">VS</div>
              {comparison && (
                <div className="comparison-highlights">
                  <h5>Key Differences:</h5>
                  {!comparison.habitat.same && (
                    <div className="comparison-diff">
                      <span className="diff-label">Habitat:</span>
                      <span className="diff-item">{animal1.name}: {comparison.habitat.value1}</span>
                      <span className="diff-item">{animal2.name}: {comparison.habitat.value2}</span>
                    </div>
                  )}
                  {!comparison.diet.same && (
                    <div className="comparison-diff">
                      <span className="diff-label">Diet:</span>
                      <span className="diff-item">{animal1.name}: {comparison.diet.value1}</span>
                      <span className="diff-item">{animal2.name}: {comparison.diet.value2}</span>
                    </div>
                  )}
                  {!comparison.environment.same && (
                    <div className="comparison-diff">
                      <span className="diff-label">Environment:</span>
                      <span className="diff-item">{animal1.name}: {comparison.environment.value1}</span>
                      <span className="diff-item">{animal2.name}: {comparison.environment.value2}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Animal 2 Info */}
            <div className="comparison-panel">
              <h4 className="comparison-animal-name">{animal2.name}</h4>
              <p className="comparison-scientific">{animal2.scientificName}</p>
              
              <div className="comparison-details">
                <div className="comparison-detail-item">
                  <span className="comparison-label">Habitat:</span>
                  <span className="comparison-value">{animal2.habitat}</span>
                </div>
                <div className="comparison-detail-item">
                  <span className="comparison-label">Diet:</span>
                  <span className="comparison-value">{animal2.diet}</span>
                </div>
                <div className="comparison-detail-item">
                  <span className="comparison-label">Size:</span>
                  <span className="comparison-value">{animal2.size}</span>
                </div>
                <div className="comparison-detail-item">
                  <span className="comparison-label">Environment:</span>
                  <span className="comparison-value">{animal2.environmentType}</span>
                </div>
              </div>

              <div className="comparison-traits">
                <h5>Key Traits:</h5>
                <ul>
                  {animal2.traits.map((trait, index) => (
                    <li key={index}>{trait}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ComparisonMode

