import { Scene } from './components/Scene'
import { Controls } from './components/Controls'

function App() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Scene />
      <Controls />
    </div>
  )
}

export default App
