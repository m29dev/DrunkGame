/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Physics, useBox, usePlane } from '@react-three/cannon'
import { useRef } from 'react'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

const ThreeFiberDice = () => {
    const meshColorRef = useRef(null)
    const [cube_1, cube_2, cube_3, cube_4, cube_5, cube_6] = useLoader(
        TextureLoader,
        [
            '/dices/dice_1_white.png',
            '/dices/dice_2_white.png',
            '/dices/dice_3_white.png',
            '/dices/dice_4_white.png',
            '/dices/dice_5_white.png',
            '/dices/dice_6_white.png',
        ]
    )

    const Floor = () => {
        const [floor] = usePlane(() => ({
            mass: 1,
            position: [0, 0, 0],
            type: 'Static',
        }))

        return (
            <mesh ref={floor}>
                <meshStandardMaterial />
            </mesh>
        )
    }

    const CubeColor = () => {
        const [ref] = useBox(() => ({
            mass: 1,
            position: [0, 5, 0],
        }))

        useFrame(() => {
            if (!meshColorRef.current) {
                return
            }

            meshColorRef.current.rotation.x += 0.01
            meshColorRef.current.rotation.y += 0.01
        })

        return (
            <mesh ref={ref}>
                <boxGeometry attach="geometry" args={[3, 3, 3]} />

                <meshStandardMaterial attach="material-0" map={cube_1} />
                <meshStandardMaterial attach="material-1" map={cube_2} />
                <meshStandardMaterial attach="material-2" map={cube_3} />
                <meshStandardMaterial attach="material-3" map={cube_4} />
                <meshStandardMaterial attach="material-4" map={cube_5} />
                <meshStandardMaterial attach="material-5" map={cube_6} />
            </mesh>
        )
    }

    function Plane(props) {
        const [ref] = usePlane(() => ({
            rotation: [-Math.PI / 2, 0, 0],
            ...props,
        }))
        return (
            <mesh ref={ref}>
                <planeGeometry args={[100, 100]}></planeGeometry>
            </mesh>
        )
    }

    function Cube(props) {
        const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], ...props }))
        return (
            <mesh ref={ref}>
                <boxGeometry />
            </mesh>
        )
    }

    return (
        <>
            <Canvas>
                <ambientLight position={[5, 5, 5]} />
                <directionalLight position={[10, 10, 10]} />
                <Physics>
                    {/* <CubeColor></CubeColor>
                    <Floor></Floor> */}

                    <Plane></Plane>
                    <Cube></Cube>
                    <CubeColor></CubeColor>
                </Physics>
            </Canvas>
        </>
    )
}

export default ThreeFiberDice
