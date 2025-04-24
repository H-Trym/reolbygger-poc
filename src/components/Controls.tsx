interface ControlsProps {
  modelCount: number
  onModelCountChange: (count: number) => void
  modelColor: string
  onModelColorChange: (color: string) => void
  dimensions: {
    height: number
    width: number
    depth: number
  }
  onDimensionChange: (dimension: 'height' | 'width' | 'depth', value: number) => void
}

export function Controls({ 
  modelCount, 
  onModelCountChange, 
  modelColor, 
  onModelColorChange,
  dimensions,
  onDimensionChange
}: ControlsProps) {
  const handleDuplicate = () => {
    onModelCountChange(modelCount + 1)
  }

  const handleReset = () => {
    onModelCountChange(1)
  }

  const handleResetDimensions = () => {
    onDimensionChange('width', 100)
    onDimensionChange('depth', 100)
  }

  return (
    <div style={{ 
      padding: '24px',
      backgroundColor: '#1a1a1a',
      height: '100vh',
      width: '30vw',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      color: '#ffffff',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        marginBottom: '16px'
      }}>
        <img 
          src="/white-shelf.png" 
          alt="Hylle Ikon" 
          style={{ 
            width: '40px', 
            height: '40px',
            objectFit: 'contain'
          }} 
        />
        <h2 style={{ 
          margin: 0,
          fontSize: '24px',
          fontWeight: '600'
        }}>Hyllekontroller</h2>
      </div>
      
      <div style={{
        backgroundColor: '#2a2a2a',
        padding: '16px',
        borderRadius: '8px'
      }}>
        <h3 style={{ 
          margin: '0 0 12px 0',
          fontSize: '16px',
          fontWeight: '500',
          color: '#a0a0a0'
        }}>Modellhåndtering</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleDuplicate}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#3a3a3a',
                border: 'none',
                borderRadius: '4px',
                color: '#ffffff',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4a4a4a'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3a3a3a'}
            >
              Dupliser Hylle
            </button>
            <button
              onClick={handleReset}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#3a3a3a',
                border: 'none',
                borderRadius: '4px',
                color: '#ffffff',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4a4a4a'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3a3a3a'}
            >
              Tilbakestill
            </button>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '8px',
            backgroundColor: '#3a3a3a',
            borderRadius: '4px'
          }}>
            <span style={{ fontSize: '14px' }}>Antall Hyller</span>
            <span style={{ 
              backgroundColor: '#4a4a4a',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              {modelCount}
            </span>
          </div>
        </div>
      </div>
      <div style={{
        backgroundColor: '#2a2a2a',
        padding: '16px',
        borderRadius: '8px'
      }}>
        <h3 style={{ 
          margin: '0 0 12px 0',
          fontSize: '16px',
          fontWeight: '500',
          color: '#a0a0a0'
        }}>Dimensjoner</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px' }}>Høyde</label>
              <span style={{ color: '#a0a0a0' }}>100% (Fast)</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="200" 
              value={100} 
              disabled
              style={{ 
                width: '100%', 
                opacity: 0.5,
                cursor: 'not-allowed'
              }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px' }}>Dybde</label>
              <span style={{ color: '#a0a0a0' }}>{dimensions.width}%</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="200" 
              value={dimensions.width} 
              onChange={(e) => onDimensionChange('width', Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px' }}>Bredde</label>
              <span style={{ color: '#a0a0a0' }}>{dimensions.depth}%</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="200" 
              value={dimensions.depth} 
              onChange={(e) => onDimensionChange('depth', Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <button
            onClick={handleResetDimensions}
            style={{
              padding: '12px',
              backgroundColor: '#3a3a3a',
              border: 'none',
              borderRadius: '4px',
              color: '#ffffff',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              marginTop: '8px',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4a4a4a'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#3a3a3a'}
          >
            Tilbakestill Dimensjoner
          </button>
        </div>
      </div>

      <div style={{
        backgroundColor: '#2a2a2a',
        padding: '16px',
        borderRadius: '8px'
      }}>
        <h3 style={{ 
          margin: '0 0 12px 0',
          fontSize: '16px',
          fontWeight: '500',
          color: '#a0a0a0'
        }}>Utseende</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '14px', display: 'block', marginBottom: '8px' }}>Farge</label>
            <input 
              type="color" 
              value={modelColor} 
              onChange={(e) => onModelColorChange(e.target.value)}
              style={{
                width: '100%',
                height: '40px',
                padding: '4px',
                backgroundColor: '#3a3a3a',
                border: 'none',
                borderRadius: '4px'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
} 