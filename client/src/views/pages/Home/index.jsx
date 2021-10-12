import React, { useEffect, useRef, useState } from 'react'
import { VideoPlayer } from '../../../entities/VideoPlayer'
import VideoJS from '../../components/video'
import './styles.css'

import { io } from 'socket.io-client'

const PageHome = () => {
    
    const [urlVideo, setUrlVideo] = useState('')
    const [playing, setPlaying] = useState(false)

    const socket = useRef(io('ws://localhost:3001'))
    useEffect(() => {
        socket.current.on('video.set', (urlVideo) => {
            setUrlVideo(urlVideo)
        })
    }, [])
    
    useEffect(() => {
        socket.current.emit('video.set', urlVideo)
    }, [urlVideo])

    useEffect(() => {
        socket.current.on('video.started', () => {
            setPlaying(true)
        })
    }, [])

    useEffect(() => {
        socket.current.on('video.paused', () => {
            setPlaying(false)
        })
    }, [])

    const videoStarted = () => {
        socket.current.emit('video.started')
    }
    
    const videoPaused = () => {
        socket.current.emit('video.paused')
    }
    
    const setVideo = () => {
        const { value } = document.getElementById('urlVideo')
        setUrlVideo(value)
    }
    
    return (
        <div id="PageHome">
            <div>
                <input id="urlVideo" />
                <button
                    type="button"
                    onClick={() => setVideo()}
                >
                    Set video
                </button>
            </div>
            <div id="contents-video">
                <VideoJS
                    playing={playing}
                    urlVideo={urlVideo}
                    videoStarted={() => videoStarted()}
                    videoPaused={() => videoPaused()}
                />
            </div>
        </div>
    )
}

export default PageHome