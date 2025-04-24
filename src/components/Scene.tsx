import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense, useMemo, useRef, useEffect, useState } from 'react'
import { Group, Box3, Vector3, Object3D, Color, MeshStandardMaterial } from 'three'

// Preload the GLB outside of the component for measurement
useGLTF.preload('/shelf.glb')

interface ModelProps {
  position: [number, number, number]
  centeredGroup: Group | null
  color: string
  dimensions: {
    height: number
    width: number
    depth: number
  }
}

function Model({ position, centeredGroup, color, dimensions }: ModelProps) {
  const groupRef = useRef<Group>(null!)
  
  // Base scale factor
  const baseScale = 5
  
  // Calculate scales as percentages
  const scaleX = (dimensions.width / 100) * baseScale
  const scaleY = (dimensions.height / 100) * baseScale
  const scaleZ = (dimensions.depth / 100) * baseScale

  // Clone the pre-centered group for this instance
  const modelInstance = useMemo(() => {
    if (!centeredGroup) return null
    const clone = centeredGroup.clone()
    
    // Apply color to all materials in the model
    clone.traverse((child: Object3D) => {
      // Check if the child has a material property (like a Mesh)
      if ('material' in child && child.material) {
        // If it's a single material
        if (!Array.isArray(child.material)) {
          // Create a new material to avoid modifying the shared one
          const newMaterial = new MeshStandardMaterial()
          // Copy properties from the original material
          if (child.material instanceof MeshStandardMaterial) {
            newMaterial.copy(child.material)
          }
          // Set the new color
          newMaterial.color = new Color(color)
          // Apply the new material
          child.material = newMaterial
        } 
        // If it's an array of materials
        else if (Array.isArray(child.material)) {
          child.material = child.material.map(mat => {
            if (mat instanceof MeshStandardMaterial) {
              const newMat = new MeshStandardMaterial().copy(mat)
              newMat.color = new Color(color)
              return newMat
            }
            return mat
          })
        }
      }
    })
    
    return clone
  }, [centeredGroup, color])

  if (!modelInstance) return null

  return <primitive 
    ref={groupRef} 
    object={modelInstance} 
    scale={[scaleX, scaleY, scaleZ]} // Apply different scale per axis
    position={position} 
  />
}

interface SceneProps {
  modelCount: number
  modelColor: string
  dimensions: {
    height: number
    width: number
    depth: number
  }
}

export function Scene({ modelCount, modelColor, dimensions }: SceneProps) {
  const [modelDimensions, setModelDimensions] = useState<{width: number, depth: number}>({ width: 0, depth: 0 })
  const [centeredGroup, setCenteredGroup] = useState<Group | null>(null)
  const baseScale = 5 // Base scale for measurement 
  const gap = 0 // Gap between models
  
  // const { scene: originalScene } = useGLTF('/shelf.glb')
  const { scene: originalScene } = useGLTF(import.meta.env.BASE_URL + 'shelf.glb')
  useGLTF.preload(import.meta.env.BASE_URL + 'shelf.glb')

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
    group.scale.set(baseScale, baseScale, baseScale)
    
    // Measure the dimensions after centering and scaling
    const scaledBox = new Box3().setFromObject(group)
    const width = scaledBox.max.x - scaledBox.min.x
    const depth = scaledBox.max.z - scaledBox.min.z
    setModelDimensions({ width, depth })

    // Reset scale before storing the group
    group.scale.set(1, 1, 1)
    setCenteredGroup(group)
  }, [originalScene, baseScale])

  // Calculate positions based on measured dimensions and current scale
  const modelPositions = useMemo(() => {
    if (modelDimensions.depth === 0) return []
    
    // Use the current depth scale to calculate spacing
    const scaledDepth = modelDimensions.depth * (dimensions.depth / 100)
    const totalSpacing = scaledDepth + gap
    
    return Array.from({ length: modelCount }, (_, i) => {
      return [0, 0, i * totalSpacing] as [number, number, number]
    })
  }, [modelCount, modelDimensions.depth, dimensions.depth, gap])

  // Update groupCenter and other calculations based on new positions
  const groupCenter = useMemo(() => {
    if (modelCount === 0 || modelPositions.length === 0) return new Vector3(0, 0, 0)
    const firstModelZ = modelPositions[0][2]
    const lastModelZ = modelPositions[modelCount - 1][2]
    const centerZ = (firstModelZ + lastModelZ) / 2
    return new Vector3(0, 0, centerZ)
  }, [modelCount, modelPositions])

  // Adjust camera position to be looking at models side-by-side
  const cameraPosition = useMemo(() => {
    // Consider current width for camera position
    const scaledWidth = modelDimensions.width * (dimensions.width / 100)
    const requiredZView = modelCount * (modelDimensions.depth * (dimensions.depth / 100) + gap)
    const xDistance = Math.max(5, Math.max(scaledWidth, requiredZView) / 1.5)
    return [xDistance, 2, groupCenter.z] as [number, number, number]
  }, [groupCenter, modelCount, modelDimensions, dimensions, gap])
  
  // Adjust max distance 
  const maxDistance = Math.max(10, modelCount * (modelDimensions.depth * (dimensions.depth / 100) + gap))
  
  // Adjust grid size
  const gridSize = Math.max(10, modelCount * (modelDimensions.depth * (dimensions.depth / 100) + gap) * 1.5)

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: cameraPosition, fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 10, groupCenter.z]} />
        <gridHelper args={[gridSize, 10]} position={[0, -0.45, groupCenter.z]} />
        <Suspense fallback={null}>
          {modelPositions.map((position, index) => (
            <Model 
              key={index} 
              position={position} 
              centeredGroup={centeredGroup} 
              color={modelColor}
              dimensions={dimensions}
            />
          ))}
        </Suspense>
        <OrbitControls 
          target={groupCenter.toArray()}
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