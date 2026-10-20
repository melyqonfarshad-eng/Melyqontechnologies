import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Environment,
  Float,
  MeshTransmissionMaterial,
  Sparkles,
} from '@react-three/drei'
import * as THREE from 'three'

// 0 at the top of the page -> 1 after one screen of scrolling
const getScrollProgress = () =>
  THREE.MathUtils.clamp(window.scrollY / window.innerHeight, 0, 1)

const Core = () => {
  const root = useRef()
  const spin = useRef()
  const gem = useRef()
  const shell = useRef()
  const ring1 = useRef()
  const ring2 = useRef()
  const ring3 = useRef()
  const progress = useRef(0)

  // Network shell: nodes (points) + connections (lines)
  const shellGeo = useMemo(() => new THREE.IcosahedronGeometry(2.1, 1), [])
  const shellEdges = useMemo(() => new THREE.WireframeGeometry(shellGeo), [shellGeo])

  useFrame((state, delta) => {
    // smooth scroll value
    progress.current = THREE.MathUtils.damp(
      progress.current,
      getScrollProgress(),
      4,
      delta
    )
    const p = progress.current

    // mouse parallax
    root.current.position.x = THREE.MathUtils.damp(
      root.current.position.x,
      state.pointer.x * 0.35,
      3,
      delta
    )
    root.current.position.y = THREE.MathUtils.damp(
      root.current.position.y,
      state.pointer.y * 0.25 + p * 0.5,
      3,
      delta
    )

    // spin gets faster while scrolling
    spin.current.rotation.y += delta * (0.25 + p * 0.6)
    spin.current.rotation.x += delta * 0.08

    // core shrinks a bit, shell expands (the "explode" effect)
    const gemScale = 1 - p * 0.2
    gem.current.scale.setScalar(gemScale)

    const shellScale = 1 + p * 0.7
    shell.current.scale.setScalar(shellScale)
    shell.current.rotation.y -= delta * 0.12
    shell.current.rotation.z += delta * 0.05

    // rings open up as you scroll
    ring1.current.rotation.x = Math.PI / 2 + p * 0.9
    ring1.current.rotation.z += delta * 0.35
    ring2.current.rotation.y = Math.PI / 3 - p * 0.9
    ring2.current.rotation.z -= delta * 0.25
    ring3.current.rotation.x = p * 1.4
    ring3.current.rotation.y += delta * 0.2
    const ringScale = 1 + p * 0.45
    ring1.current.scale.setScalar(ringScale)
    ring2.current.scale.setScalar(ringScale)
    ring3.current.scale.setScalar(ringScale)
  })

  return (
    <group ref={root}>
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
        <group ref={spin}>
          {/* Glass crystal */}
          <group ref={gem}>
            <mesh>
              <icosahedronGeometry args={[1.15, 1]} />
              <MeshTransmissionMaterial
                color="#ffffff"
                flatShading
                roughness={0.05}
                metalness={0}
                transmission={1}
                thickness={1.2}
                ior={1.35}
                chromaticAberration={0.06}
                anisotropicBlur={0.1}
                backside
                samples={4}
                resolution={384}
              />
            </mesh>

            {/* Dark "chip" inside the glass */}
            <mesh>
              <octahedronGeometry args={[0.45, 0]} />
              <meshStandardMaterial color="#0a0a0a" metalness={1} roughness={0.15} />
            </mesh>
          </group>

          {/* Orbit rings */}
          <mesh ref={ring1}>
            <torusGeometry args={[1.65, 0.012, 16, 160]} />
            <meshStandardMaterial color="#e5e5e5" metalness={1} roughness={0.2} />
          </mesh>
          <mesh ref={ring2}>
            <torusGeometry args={[1.85, 0.01, 16, 160]} />
            <meshStandardMaterial color="#8a8a8a" metalness={1} roughness={0.25} />
          </mesh>
          <mesh ref={ring3}>
            <torusGeometry args={[2.05, 0.008, 16, 160]} />
            <meshStandardMaterial color="#cfcfcf" metalness={1} roughness={0.3} />
          </mesh>

          {/* Network shell */}
          <group ref={shell}>
            <lineSegments geometry={shellEdges}>
              <lineBasicMaterial color="#ffffff" transparent opacity={0.18} />
            </lineSegments>
            <points geometry={shellGeo}>
              <pointsMaterial
                color="#ffffff"
                size={0.05}
                sizeAttenuation
                transparent
                opacity={0.9}
              />
            </points>
          </group>
        </group>
      </Float>
    </group>
  )
}

const AbstractLoop = () => {
  const wrapRef = useRef(null)
  const [visible, setVisible] = useState(true)

  // Stop rendering the 3D scene when it is not on screen (big scroll performance win)
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className="abstract-loop h-full w-full">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        camera={{ position: [0, 0, 6], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 4, 5]} intensity={2.5} />
        <pointLight position={[-4, -2, 2]} intensity={2} color="#ffffff" />

        <Suspense fallback={null}>
          <Core />
          <Sparkles
            count={50}
            scale={8}
            size={1.6}
            speed={0.3}
            opacity={0.35}
            color="#ffffff"
          />
          <Environment preset="city" environmentIntensity={0.9} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default AbstractLoop