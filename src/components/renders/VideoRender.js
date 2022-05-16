import React, {useState, useEffect} from 'react'
import ReactPlayer from 'react-player'

export default function VideoRender( {type, value} ){
    const [src, ] = useState(value.src)

    return(
      <>
        <ReactPlayer url={src} controls={true}></ReactPlayer>
      </>
    )
  }
  