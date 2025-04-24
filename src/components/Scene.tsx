import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense, useMemo, useRef, useEffect, useState } from 'react'
import { Group, Box3, Vector3, Object3D } from 'three'

// Preload the GLB outside of the component for measurement
useGLTF.preload('/shelf.glb')

interface ModelProps {
  position: [number, number, number]
  centeredGroup: Group | null // Pass the centered group geometry
  scale: number
}

function Model({ position, centeredGroup, scale }: ModelProps) {
  const groupRef = useRef<Group>(null!)

  // Clone the pre-centered group for this instance
  const modelInstance = useMemo(() => {
    if (!centeredGroup) return null
    return centeredGroup.clone()
  }, [centeredGroup])

  if (!modelInstance) return null // Don't render if geometry isn't ready

  return <primitive 
    ref={groupRef} 
    object={modelInstance} 
    scale={scale} 
    position={position} 
  />
}

interface SceneProps {
  modelCount: number
}

export function Scene({ modelCount }: SceneProps) {
  const [modelDimensions, setModelDimensions] = useState<{width: number, depth: number}>({ width: 0, depth: 0 })
  const [centeredGroup, setCenteredGroup] = useState<Group | null>(null)
  const modelScale = 5
  const gap = 0 // Reduced gap between models
  
  const { scene: originalScene } = useGLTF('/shelf.glb')

  // Effect to create and measure the centered model once
  useEffect(() => {
    if (!originalScene) return

    const group = new Group()
    const modelClone = originalScene.clone()
    group.add(modelClone)
    
    // Center the model in the group
    const box = new Box3().setFromObject(modelClone)
    const center = box.getCenter(new Vector3())
    modelClone.position.sub(center)
    
    // Apply scale for measurement
    group.scale.set(modelScale, modelScale, modelScale)
    
    // Measure the dimensions after centering and scaling
    const scaledBox = new Box3().setFromObject(group)
    const width = scaledBox.max.x - scaledBox.min.x
    const depth = scaledBox.max.z - scaledBox.min.z
    setModelDimensions({ width, depth })

    // Reset scale before storing the group (scale is applied in Model component)
    group.scale.set(1, 1, 1)
    setCenteredGroup(group)

  }, [originalScene, modelScale])

  // Calculate positions based on measured dimensions - now along Z-axis
  const modelPositions = useMemo(() => {
    if (modelDimensions.depth === 0) return [] // Don't calculate positions until dimensions are known
    const totalSpacing = modelDimensions.depth + gap
    return Array.from({ length: modelCount }, (_, i) => {
      // Position along Z-axis (side-by-side from camera view)
      return [0, 0, i * totalSpacing] as [number, number, number]
    })
  }, [modelCount, modelDimensions.depth, gap])

  // Calculate the center of the model group
  const groupCenter = useMemo(() => {
    if (modelCount === 0 || modelPositions.length === 0) return new Vector3(0, 0, 0)
    const firstModelZ = modelPositions[0][2]
    const lastModelZ = modelPositions[modelCount - 1][2]
    const centerZ = (firstModelZ + lastModelZ) / 2
    return new Vector3(0, 0, centerZ)
  }, [modelCount, modelPositions])

  // Adjust camera position to be looking at models side-by-side
  const cameraPosition = useMemo(() => {
    const requiredZView = modelCount * (modelDimensions.depth + gap)
    const xDistance = Math.max(5, requiredZView / 2)
    return [xDistance, 2, groupCenter.z] as [number, number, number]
  }, [groupCenter, modelCount, modelDimensions.depth, gap])
  
  // Adjust max distance 
  const maxDistance = Math.max(10, modelCount * (modelDimensions.depth + gap))
  
  // Adjust grid size
  const gridSize = Math.max(10, modelCount * (modelDimensions.depth + gap) * 1.5)

  return (
    <div style={{ flex: 1, height: '100vh' }}>
      <Canvas camera={{ position: cameraPosition, fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 10, groupCenter.z]} /> {/* Center light */} 
        <gridHelper args={[gridSize, 10]} position={[0, -0.45, groupCenter.z]} />
        <Suspense fallback={null}>
          {modelPositions.map((position, index) => (
            <Model 
              key={index} 
              position={position} 
              centeredGroup={centeredGroup} 
              scale={modelScale} 
            />
          ))}
        </Suspense>
        <OrbitControls 
          target={groupCenter.toArray()} // Target the center of the group
          minDistance={1} 
          maxDistance={maxDistance}
          enablePan={false}
          minPolarAngle={0}
          maxPolarAngle={Math.PI/2}
        />
      </Canvas>
    </div>
  )
} 