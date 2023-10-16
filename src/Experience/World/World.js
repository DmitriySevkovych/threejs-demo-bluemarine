import Experience from '../Experience.js'
import WaterStream from './WaterStream/WaterStream.js'

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Setup
        // Wait for resources
        this.resources.on('ready', () => {
            this.waterStream = new WaterStream(10000)
        })
    }

    update() {
        if (this.waterStream) this.waterStream.update()
    }
}
