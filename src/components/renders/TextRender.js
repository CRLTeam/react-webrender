import React, {useState} from 'react'

import { Text, Classes, Tag } from "@blueprintjs/core"


export default function TextRender( {type, value} ){
  const [bigText, ] = useState(value.text)
  const [smallText, ] = useState(value)

    return(
      <>
        {type == 'title' &&
          <h1 className="display-1">{ bigText }</h1>
        }
        {type == 'header' &&
          <h3 className="h1">{ bigText }</h3>
        }
        {type == 'text' &&
          <Text><p className="text-left text-justify">{ smallText }</p></Text>
        }
      </>
    )
  }
  