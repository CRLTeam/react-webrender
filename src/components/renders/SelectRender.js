import React, { useEffect, useState } from "react"

export default function SelectRender( {type, value, webrender} ){
    const [fieldName, ] = useState(value.fieldName)
    const [options, ] = useState(value.options)
    const [optionsContent, setOptionsContent] = useState([])

    useEffect(()=>{
        let content = [];

        if(type == 'dropdownselect'){
            for (let i = 0; i < options.length; i++) {
                let text = options[i].option.text;
                // console.log(text);
                content.push(

                    <option value={text}>{text}</option>

                );
            }
        }

        setOptionsContent(content)
      
    }, []);

    return(
      <>

          {type == 'dropdownselect' &&
            <select className="form-control" name={fieldName} value={webrender.state[fieldName]} onChange={webrender.handleInputChange}>
                {optionsContent}
            </select>
          }
      </>
    )
  }

    // var options = [];
    // let fieldName = value.fieldName;
    // for (let i = 0; i < value.options.length; i++) {
    //     let text = value.options[i].option.text;
    //     console.log(text);
    //     options.push(

    //         <option value={text}>{text}</option>

    //     );
    // }

    // display.push(
    //     <select className="form-control" name={fieldName} value={this.state[fieldName]} onChange={this.handleInputChange}>
    //         {options}
    //     </select>
    // );