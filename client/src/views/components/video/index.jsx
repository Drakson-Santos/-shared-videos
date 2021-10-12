import React from 'react'
import ReactPlayer from 'react-player'

const VideoJS = ({
    playing = false,
    urlVideo = '',
    videoStarted = () => {},
    videoPaused = () => {},
}) => {

    const videoPlay = () => {
        videoStarted()
    }

    const videoPause = () => {
        videoPaused()
    }
    
    const videoEnded = () => {
        console.log('video ended.')
    }
    
    const videoError = () => {
        console.log('video error')
    }
    
    return (
        <ReactPlayer
            playing={playing}
            url={urlVideo}
            onPlay={videoPlay}
            onPause={videoPause}
            onEnded={videoEnded}
            onError={videoError}
            controls={true}
            // width='100%'
            // height='100%'
        />
    )
}

export default VideoJS
