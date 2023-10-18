import Experience from '../Experience.js'
import WaterBubbles from './WaterBubbles/WaterBubbles.js'
import WaterStream from './WaterStream/WaterStream.js'

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Setup
        // Wait for resources
        this.resources.on('ready', () => {
            this.resourcesLoaded = true
            this.waterBubbles = new WaterBubbles(10000)
            this.waterStream = new WaterStream(100)
        })
    }

    update() {
        if (!this.resourcesLoaded) return

        this.waterBubbles.update()
        this.waterStream.update()
    }
}
