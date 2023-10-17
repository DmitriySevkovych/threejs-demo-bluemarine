import Experience from '../Experience.js'
import WaterBubbles from './WaterBubbles/WaterBubbles.js'

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Setup
        // Wait for resources
        this.resources.on('ready', () => {
            this.waterBubbles = new WaterBubbles(10000)
        })
    }

    update() {
        if (this.waterBubbles) this.waterBubbles.update()
    }
}
