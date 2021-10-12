export class SocketNode {

    async sendUrl(urlVideo) {
        console.log('envia para o backend', urlVideo)
    }

    async sendVideoStarted(value) {
        console.log('sendVideoStarted', value)
    }

    async sendVideoPaused(value) {
        console.log('sendVideoPaused', value)
    }
}