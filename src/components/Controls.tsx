import { useState } from 'react'

export function Controls() {
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(1)
  const [color, setColor] = useState('#ffffff')
  const [height, setHeight] = useState(100)
  const [width, setWidth] = useState(100)
  const [depth, setDepth] = useState(100)
  const [material, setMaterial] = useState('wood')
  const [shelves, setShelves] = useState(3)

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
      <h2 style={{ 
        margin: '0 0 16px 0',
        fontSize: '24px',
        fontWeight: '600'
      }}>Shelf Controls</h2>
      
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
        }}>Transform</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px' }}>Rotation</label>
              <span style={{ color: '#a0a0a0' }}>{rotation}°</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="360" 
              value={rotation} 
              onChange={(e) => setRotation(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px' }}>Scale</label>
              <span style={{ color: '#a0a0a0' }}>{scale}x</span>
            </div>
            <input 
              type="range" 
              min="0.1" 
              max="2" 
              step="0.1"
              value={scale} 
              onChange={(e) => setScale(Number(e.target.value))}
              style={{ width: '100%' }}
            />
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
        }}>Dimensions</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px' }}>Height</label>
              <span style={{ color: '#a0a0a0' }}>{height} cm</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="200" 
              value={height} 
              onChange={(e) => setHeight(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px' }}>Width</label>
              <span style={{ color: '#a0a0a0' }}>{width} cm</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="200" 
              value={width} 
              onChange={(e) => setWidth(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px' }}>Depth</label>
              <span style={{ color: '#a0a0a0' }}>{depth} cm</span>
            </div>
            <input 
              type="range" 
              min="20" 
              max="100" 
              value={depth} 
              onChange={(e) => setDepth(Number(e.target.value))}
              style={{ width: '100%' }}
            />
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
        }}>Appearance</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '14px', display: 'block', marginBottom: '8px' }}>Material</label>
            <select 
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                backgroundColor: '#3a3a3a',
                border: 'none',
                borderRadius: '4px',
                color: '#ffffff'
              }}
            >
              <option value="wood">Wood</option>
              <option value="metal">Metal</option>
              <option value="plastic">Plastic</option>
            </select>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px' }}>Number of Shelves</label>
              <span style={{ color: '#a0a0a0' }}>{shelves}</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={shelves} 
              onChange={(e) => setShelves(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '14px', display: 'block', marginBottom: '8px' }}>Color</label>
            <input 
              type="color" 
              value={color} 
              onChange={(e) => setColor(e.target.value)}
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