import { useState } from 'react'
import { Scene } from './components/Scene'
import { Controls } from './components/Controls'

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
    setDimensions(prev => ({
      ...prev,
      [dimension]: value
    }))
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Scene 
        modelCount={modelCount} 
        modelColor={modelColor}
        dimensions={dimensions}
      />
      <Controls 
        modelCount={modelCount} 
        onModelCountChange={setModelCount}
        modelColor={modelColor}
        onModelColorChange={setModelColor}
        dimensions={dimensions}
        onDimensionChange={handleDimensionChange}
      />
    </div>
  )
}

export default App
