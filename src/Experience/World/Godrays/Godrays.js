import * as THREE from 'three'

import Experience from '../../Experience.js'
import fragmentShader from './fragment.glsl'
import vertexShader from './vertex.glsl'

export default class Godrays {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug
        this.time = this.experience.time
        this.resources = this.experience.resources

        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('godrays')
        }

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry() {
        this.geometry = new THREE.PlaneGeometry(20, 20)
    }

    setMaterial() {
        const { godraysNoise } = this.resources.items
        godraysNoise.wrapS = THREE.RepeatWrapping
        godraysNoise.wrapT = THREE.RepeatWrapping

        const parameters = {
            source: {
                x: -7,
                y: 13.5,
            },
        }

        this.material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: this.time.elapsed },
                uNoise: { value: godraysNoise },
                uGodraysSource: {
                    value: new THREE.Vector2(
                        parameters.source.x,
                        parameters.source.y
                    ),
                },
            },
            vertexShader,
            fragmentShader,
            transparent: true,
            depthTest: false,
        })

        // Debug
        if (this.debug.active) {
            this.debugFolder
                .add(parameters.source, 'x', -10, 10)
                .onChange(
                    (value) =>
                        (this.material.uniforms.uGodraysSource.value.x = value)
                )
            this.debugFolder
                .add(parameters.source, 'y', 0, 20)
                .onChange(
                    (value) =>
                        (this.material.uniforms.uGodraysSource.value.y = value)
                )
        }
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.z = -1
        this.scene.add(this.mesh)
    }

    update() {
        this.material.uniforms.time.value = this.time.elapsed
    }
}
