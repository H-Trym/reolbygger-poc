import { useState } from 'react'
import { Scene } from './components/Scene'
import { Controls } from './components/Controls'

function App() {
  const [modelCount, setModelCount] = useState(1)

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Scene modelCount={modelCount} />
      <Controls 
        modelCount={modelCount} 
        onModelCountChange={setModelCount} 
      />
    </div>
  )
}

export default App
