import './InfoPanel.css'

/**
 * InfoPanel Component
 * Displays educational information about the selected animal
 */
function InfoPanel({ animal }) {
  if (!animal) return null

  return (
    <div className="info-panel">
      <div className="info-header">
        <h2 className="animal-name">{animal.name}</h2>
        <span className="animal-scientific">{animal.scientificName}</span>
      </div>

      <div className="info-content">
        {/* Habitat Information */}
        <div className="info-section">
          <div className="info-icon">🌍</div>
          <div className="info-text">
            <h3>Habitat</h3>
            <p>{animal.habitat}</p>
          </div>
        </div>

        {/* Diet Information */}
        <div className="info-section">
          <div className="info-icon">🍃</div>
          <div className="info-text">
            <h3>Diet</h3>
            <p>{animal.diet}</p>
          </div>
        </div>

        {/* Key Traits */}
        <div className="info-section">
          <div className="info-icon">⭐</div>
          <div className="info-text">
            <h3>Key Traits</h3>
            <ul className="traits-list">
              {animal.traits.map((trait, index) => (
                <li key={index}>{trait}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Size Information */}
        {animal.size && (
          <div className="info-section">
            <div className="info-icon">📏</div>
            <div className="info-text">
              <h3>Size</h3>
              <p>{animal.size}</p>
            </div>
          </div>
        )}

        {/* Fun Fact */}
        {animal.funFact && (
          <div className="info-section fun-fact">
            <div className="info-icon">💡</div>
            <div className="info-text">
              <h3>Did You Know?</h3>
              <p>{animal.funFact}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InfoPanel

