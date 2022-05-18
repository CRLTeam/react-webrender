import React, { useState, useEffect } from "react"
import FormRender from "./FormRender";

export default function InputRender( {type, value, webrender} ){
    const [fieldName, ] = useState(value.fieldName)
    const [inputName, ] = useState(value.inputName)
    
  //   useEffect(()=>{
  //     let content = [];

  //     console.log('type ', value.type)
  //     if(type == 'input'){
  //       if(value.type == 'input'){

  //       }
  //         for (let i = 0; i < options.length; i++) {
  //             let text = options[i].option.text;
  //             // console.log(text);
  //             content.push(

  //                 <option value={text}>{text}</option>

  //             );
  //         }
  //     }

  //     // setOptionsContent(content)
    
  // }, []);

    return(
      <>
        {/* TODO: keep in mind when testing: value is always set to this.state[fieldName], makes no sense, this.state[fieldName] is never set */}
        {type == 'shorttextinput' &&
          <div className="form-group">
            <label for={fieldName}>{inputName}</label>
            {/* this makes no sense: */}
            {/* {this.state[fieldName]} */}
            {fieldName}
            <input type="text" class="form-control" value={fieldName} onChange={webrender.handleInputChange} name={fieldName} id={fieldName} aria-describedby="Small input" placeholder={"Enter Text"}></input>
          </div>
        }
        {type == 'paragraphinput' &&
          <div className="form-group">
            <label for={fieldName}>{inputName}</label>
            <textarea type="text" class="form-control" value={fieldName} onChange={webrender.handleInputChange} name={fieldName} id={fieldName} aria-describedby="Large input" placeholder={"Enter Text"}></textarea>
          </div>
        }
        {type == 'dateinput' &&
          <div className="form-group">
            <label for={inputName}>{inputName}</label>
            <input type="date" class="form-control" id={fieldName} name={fieldName} value={fieldName} onChange={webrender.handleInputChange} aria-describedby="Date input"></input>
          </div>
        }
        {type == 'timeinput' &&
          <div className="form-group">
            <label for={fieldName}>{inputName}</label>
            <input type="time" class="form-control" id={fieldName} name={fieldName} value={fieldName} onChange={webrender.handleInputChange} aria-describedby="Time input"></input>
          </div>
        }
        {
          type == 'input' &&
          <FormRender  type={type} value={value} webrender={webrender}/>
        }
      </>
    )
  }
  // short input
  // <div className="form-group">
  //     <label for={fieldName}>{inputName}</label>
  //     {this.state[fieldName]}
  //     <input type="text" class="form-control" value={this.state[fieldName]} onChange={this.handleInputChange} name={fieldName} id={fieldName} aria-describedby="Small input" placeholder={"Enter Text"}></input>
  // </div>

  // paragraph
  // <div className="form-group">
  //     <label for={fieldName}>{inputName}</label>
  //     <textarea type="text" class="form-control" value={this.state[fieldName]} onChange={this.handleInputChange} name={fieldName} id={fieldName} aria-describedby="Large input" placeholder={"Enter Text"}></textarea>
  // </div>

  // date input
  // <div className="form-group">
  //     <label for={inputName}>{inputName}</label>
  //     <input type="date" class="form-control" id={fieldName} name={fieldName} value={this.state[fieldName]} onChange={this.handleInputChange} aria-describedby="Date input"></input>
  // </div>

  // time input
  // <div className="form-group">
  //     <label for={fieldName}>{inputName}</label>
  //     <input type="time" class="form-control" id={fieldName} name={fieldName} value={this.state[fieldName]} onChange={this.handleInputChange} aria-describedby="Time input"></input>
  // </div>