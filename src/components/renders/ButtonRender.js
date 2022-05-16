import React, { useEffect, useState } from "react"

export default function ButtonRender( {type, value, webrender} ){
    const [text, ] = useState(value.text)
    const [action, ] = useState(value.actionID)
    const [radioButtons, setRadioButtons] = useState([])
    const [, setDropdownContent] = useState([])

    useEffect(()=>{
      let content = [];
      // console.log('TYPE ', type)
      // console.log('text ', text)
      // console.log(' action ', action)

      if(type == 'radiobuttonlist'){
        let fieldName = value.fieldName;
        for (let i = 0; i < value.options.length; i++) {
            let text = value.options[i].radioButton.text;
            let isDefault = value.options[i].radioButton.isDefault;
            let radioName = fieldName + i;
            this.state[radioName] = false;
            if (isDefault === true) {
                content.push(
                    <div className="form-check">
                        <input class="form-check-input" type="radio" checked={webrender.state[radioName]} onChange={webrender.handleInputChange} name={radioName} id={radioName}/>
                        <label class="form-check-label" for={"radioButton" + i}>
                            {text}
                        </label>
                    </div> 
                );
            } else {
                content.push(
                    <div className="form-check">
                        <label class="form-check-label" for={radioName}>
                            <input class="form-check-input" type="radio" checked={webrender.state[radioName]} onChange={webrender.handleInputChange} name={radioName} id={radioName}/>
                            {text}
                        </label>
                    </div> 
                );
            }
            
        }
        setRadioButtons(content)
      }
    }, []);

    return(
      <>
        
          {/* {type == 'post' && 
            <input type="submit" value={text} className="btn btn-primary m-2 float-right" v-else-if="display_item.Button"/>
          } */}
          {type == 'button' &&
            <button 
              onClick={() => webrender.buttonClick(text, action, webrender)} 
              type="button" className="btn btn-primary m-2 float-right" v-else-if="display_item.Button">{ text }</button>
          }
          {type == 'radiobuttonlist' &&
            <div className="form-check">
              {radioButtons}
            </div>
          }
      </>
    )
  }