import { SocketNode } from "../repository/implementations/Socket"

export class VideoPlayer {
    constructor() {
        this.repository = new SocketNode()
        this.urlVideo = ''
        this.started = false
        this.paused = undefined
    }

    // Set
    async setVideoStarted(value) {
        this.started = value
        this.repository.sendVideoStarted(value)
        this.setVideoPaused(!value)
    }

    async setVideoPaused(value) {
        this.paused = value
        this.repository.sendVideoPaused(value)
    }

    async setUrlVideo(url) {
        this.urlVideo = url
        this.repository.sendUrl(this.urlVideo)
    }

    async videoStarted () {
        this.setVideoStarted(true)
    }

    async videoPaused() {
        this.setVideoPaused(!this.paused)
    }
}