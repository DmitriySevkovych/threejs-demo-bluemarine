import * as THREE from 'three'

import Experience from '../../Experience.js'
import fragmentShader from './fragment.glsl'
import vertexShader from './vertex.glsl'

export default class WaterStream {
    constructor(segments) {
        this.segments = segments

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
        const { sin, cos, PI } = Math

        const parameters = {
            curve: {
                tubularSegments: 100,
                radialSegmenst: 100,
                radius: 0.4,
                closed: true,
            },
        }

        const points = []
        for (let i = 0; i <= this.segments; i++) {
            let angle = (2 * PI * i) / this.segments
            let x = sin(angle) + 2.0 * sin(2.0 * angle)
            let y = cos(angle) - 2.0 * cos(2.0 * angle)
            let z = -sin(3.0 * angle)

            points.push(new THREE.Vector3(x, y, z))
        }

        const trefoilCurve = new THREE.CatmullRomCurve3(points)

        this.geometry = new THREE.TubeGeometry(
            trefoilCurve,
            parameters.curve.tubularSegments,
            parameters.curve.radius,
            parameters.curve.radialSegmenst,
            parameters.curve.closed
        )
    }

    setMaterial() {
        const { waterStream, waterStreamNoise } = this.resources.items

        waterStream.wrapT = THREE.RepeatWrapping
        waterStream.wrapS = THREE.RepeatWrapping
        waterStreamNoise.wrapT = THREE.RepeatWrapping
        waterStreamNoise.wrapS = THREE.RepeatWrapping

        this.material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: this.time.elapsed },
                uWaterStream: { value: waterStream },
                uWaterStreamNoise: { value: waterStreamNoise },
            },
            vertexShader,
            fragmentShader,
            transparent: true,
            depthTest: false,
        })
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }

    update() {
        this.material.uniforms.time.value = this.time.elapsed
    }
}
