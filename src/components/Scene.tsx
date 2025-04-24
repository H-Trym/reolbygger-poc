import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense } from 'react'
import { Group, Box3, Vector3 } from 'three'

function Model() {
  const { scene } = useGLTF('/shelf.glb')
  // Create a group to center the model
  const group = new Group()
  group.add(scene)
  
  // Center the model in the group
  const box = new Box3().setFromObject(scene)
  const center = box.getCenter(new Vector3())
  scene.position.sub(center)
  
  return <primitive object={group} scale={5} />
}

export function Scene() {
  return (
    <div style={{ flex: 1, height: '100vh' }}>
      <Canvas camera={{ position: [2, 2, 2], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <gridHelper args={[10, 10]} position={[0, -0.45, 0]} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <OrbitControls 
          minDistance={1} 
          maxDistance={5}
          enablePan={false}
          minPolarAngle={0}
          maxPolarAngle={Math.PI/2}
        />
      </Canvas>
    </div>
  )
} 