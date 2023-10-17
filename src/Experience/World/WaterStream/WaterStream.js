import * as THREE from 'three'

import Experience from '../../Experience.js'
import fragmentShader from './fragment.glsl'
import vertexShader from './vertex.glsl'

export default class WaterStream {
    constructor(bubbles) {
        this.bubbles = bubbles

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        this.time = this.experience.time
        this.resources = this.experience.resources

        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('water stream')
        }

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry() {
        this.geometry = new THREE.BufferGeometry()

        const positions = new Float32Array(this.bubbles * 3)
        const randoms = new Float32Array(this.bubbles * 3)
        const sizes = new Float32Array(this.bubbles * 3)

        for (let i = 0; i < this.bubbles; i++) {
            positions[3 * i + 0] = Math.random() - 0.5
            positions[3 * i + 1] = Math.random() - 0.5
            positions[3 * i + 2] = Math.random() - 0.5

            randoms[3 * i + 0] = Math.random()
            randoms[3 * i + 1] = Math.random()
            randoms[3 * i + 2] = Math.random()

            sizes[i] = 0.5 + 0.5 * Math.random()
        }

        this.geometry.setAttribute(
            'position',
            new THREE.BufferAttribute(positions, 3)
        )
        this.geometry.setAttribute(
            'aRandom',
            new THREE.BufferAttribute(randoms, 3)
        )
        this.geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    }

    setMaterial() {
        const parameters = {
            bubbleColor: '#79c6ce',
            bubbleSize: 50,
        }

        this.material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: this.time.elapsed },
                uSphereNormals: { value: this.resources.items.sphereNormals },
                uBubbleColor: {
                    value: new THREE.Color(parameters.bubbleColor),
                },
                uBaseBubbleSize: { value: parameters.bubbleSize },
            },
            vertexShader,
            fragmentShader,
            transparent: true,
            depthTest: false,
        })

        if (this.debug.active) {
            this.debugFolder
                .add(parameters, 'bubbleSize', 10, 100)
                .onChange(
                    (value) =>
                        (this.material.uniforms.uBaseBubbleSize.value = value)
                )
            this.debugFolder
                .addColor(parameters, 'bubbleColor')
                .onChange(
                    (color) =>
                        (this.material.uniforms.uBubbleColor.value =
                            new THREE.Color(color))
                )
        }
    }

    setMesh() {
        this.mesh = new THREE.Points(this.geometry, this.material)
        this.scene.add(this.mesh)
    }

    update() {
        this.material.uniforms.time.value = this.time.elapsed
    }
}
