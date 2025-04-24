import { useState } from 'react'
import { Scene } from './components/Scene'
import { Controls } from './components/Controls'

function App() {
  const [modelCount, setModelCount] = useState(1)
  const [modelColor, setModelColor] = useState('#ffffff')

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Scene 
        modelCount={modelCount} 
        modelColor={modelColor}
      />
      <Controls 
        modelCount={modelCount} 
        onModelCountChange={setModelCount}
        modelColor={modelColor}
        onModelColorChange={setModelColor}
      />
    </div>
  )
}

export default App
