import { useState, useEffect } from 'react'
import './GuidedLearningMode.css'

/**
 * GuidedLearningMode Component
 * Provides step-by-step guided learning with camera focus and educational content
 */
function GuidedLearningMode({ 
  animal, 
  isActive, 
  onClose, 
  onCameraFocus 
}) {
  const [currentStep, setCurrentStep] = useState(0)
  const steps = animal?.guidedLearningSteps || []

  // Reset to first step when animal changes or mode is activated
  useEffect(() => {
    if (isActive && steps.length > 0) {
      setCurrentStep(0)
      // Focus camera on first step
      if (steps[0] && onCameraFocus) {
        onCameraFocus(
          steps[0].cameraPosition,
          steps[0].cameraTarget
        )
      }
    }
  }, [isActive, animal?.id, steps.length, onCameraFocus])

  // Focus camera when step changes
  useEffect(() => {
    if (isActive && steps[currentStep] && onCameraFocus) {
      onCameraFocus(
        steps[currentStep].cameraPosition,
        steps[currentStep].cameraTarget
      )
    }
  }, [currentStep, isActive, steps, onCameraFocus])

  if (!isActive || !animal || steps.length === 0) {
    return null
  }

  const currentStepData = steps[currentStep]
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === steps.length - 1

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
  }

  return (
    <div className="guided-learning-overlay">
      <div className="guided-learning-panel">
        {/* Header */}
        <div className="guided-learning-header">
          <div className="guided-learning-title">
            <span className="guided-icon">📚</span>
            <h3>Guided Learning Mode</h3>
          </div>
          <button 
            className="guided-close-button"
            onClick={handleClose}
            aria-label="Close Guided Learning"
          >
            ×
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="guided-progress">
          <div className="guided-progress-bar">
            <div 
              className="guided-progress-fill"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          <span className="guided-progress-text">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>

        {/* Current Step Content */}
        {currentStepData && (
          <div className="guided-step-content">
            <div className="guided-step-region">
              <span className="guided-step-number">{currentStepData.step}</span>
              <h4 className="guided-step-title">{currentStepData.title}</h4>
            </div>
            <p className="guided-step-description">
              {currentStepData.description}
            </p>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="guided-navigation">
          <button
            className="guided-nav-button guided-nav-prev"
            onClick={handlePrevious}
            disabled={isFirstStep}
            aria-label="Previous Step"
          >
            ← Previous
          </button>
          
          <div className="guided-step-indicators">
            {steps.map((_, index) => (
              <button
                key={index}
                className={`guided-step-dot ${
                  index === currentStep ? 'active' : ''
                } ${index < currentStep ? 'completed' : ''}`}
                onClick={() => setCurrentStep(index)}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>

          <button
            className="guided-nav-button guided-nav-next"
            onClick={handleNext}
            disabled={isLastStep}
            aria-label="Next Step"
          >
            Next →
          </button>
        </div>

        {/* Completion Message */}
        {isLastStep && (
          <div className="guided-completion">
            <p>🎉 You've completed the guided tour!</p>
            <p className="guided-completion-subtitle">
              Explore freely or start over to review.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default GuidedLearningMode

