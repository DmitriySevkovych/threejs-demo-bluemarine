import Experience from '../Experience.js'
import WaterStream from './WaterStream/WaterStream.js'

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene

        // Setup
        this.waterStream = new WaterStream(10000)
    }

    update() { }
}
