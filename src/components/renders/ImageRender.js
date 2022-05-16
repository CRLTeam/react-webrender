import React, {useState} from 'react'

export default function ImageRender( {type, value} ){
    const [src, ] = useState(value.src)
    const [alt_text, ] = useState(value['alt-text'])
    
    return(
      <>
        <div className="text-center">
          <img className="image-fluid m-2" style={{width: "500px", height: "auto", objectFit: "cover"}} src={src} alt={alt_text}/> 
        </div>
      </>
    )
  }
  