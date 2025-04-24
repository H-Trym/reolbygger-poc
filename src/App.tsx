import { useState } from 'react'
import { Scene } from './components/Scene'
import { Controls } from './components/Controls'
import './App.css'

function App() {
  const [modelCount, setModelCount] = useState(1)
  const [modelColor, setModelColor] = useState('#ffffff')
  
  // Add state for dimensions
  const [dimensions, setDimensions] = useState({
    height: 100,
    width: 100,
    depth: 100
  })

  // Handler for updating dimensions
  const handleDimensionChange = (dimension: 'height' | 'width' | 'depth', value: number) => {
    // Always keep height at 100% regardless of what's passed
    if (dimension === 'height') return;
    
    setDimensions(prev => ({
      ...prev,
      [dimension]: value
    }))
  }

  return (
    <div className="app-container">
      <div className="scene-container">
        <Scene 
          modelCount={modelCount} 
          modelColor={modelColor}
          dimensions={dimensions}
        />
      </div>
      <div className="controls-container">
        <Controls 
          modelCount={modelCount} 
          onModelCountChange={setModelCount}
          modelColor={modelColor}
          onModelColorChange={setModelColor}
          dimensions={dimensions}
          onDimensionChange={handleDimensionChange}
        />
      </div>
    </div>
  )
}

export default App
