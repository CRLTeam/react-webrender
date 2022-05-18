import React, { useState, useEffect } from "react"

import { FormGroup, InputGroup, Label, Classes, Button } from "@blueprintjs/core"
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import Select from 'react-select'
// import Dropdown from "react-bootstrap-dropdown";

export default function FormRender( {type, value, webrender} ){
    const [formType, ] = useState(value.type)
    const [inputs, ] = useState(value.inputs)
    const [formData, setFormData] = useState({})
    const [footer, setFooter] = useState({})

    const [renderForm, setRenderForm] = useState([])
    
    const updateFormData = (name, data) => {
        let fd = formData

        fd[name] = data

        setFormData(fd)
    }

    const updateDate = (name, data) => {
        console.log('name ', name)
        console.log('data ', data)
        // let fd = formData

        // fd[name] = data

        // setFormData(fd)
    }

    useEffect(()=>{
      let content = [];

    //   console.log('type ', value.type)
      if(type == 'input'){
        if(formType == 'form'){
            for (let input of inputs) {
                console.log(input);
                // create formData variable for the input
                let name = input.label
                let fd = formData
                fd[name] = ''
                setFormData(fd)
                // create optional tag
                let optional = ''
                input.optional ? optional='(optional)' : optional=''
                    if(input.type == 'text'){
                        content.push(
                            <Label>{input.label_text}<span class="bp4-text-muted"> {optional}</span>
                                <InputGroup key={JSON.stringify(input)} label={name} type={input.type} name={name} value={formData.name} placeholder={input.placeholder} required={!input.optional}
                                onChange= {(e) =>{
                                    updateFormData(name, e.target.value)
                                }}/>
                            </Label>
                        );
                    } else if (input.type == 'tel'){
                        let pattern = input.data.pattern
                        content.push(
                            <Label>{input.label_text}<span class="bp4-text-muted"> {optional}</span>
                                <InputGroup key={JSON.stringify(input)} label={name} type={input.type} name={name} value={formData.name} pattern={pattern} placeholder={input.placeholder} required={!input.optional} //leftIcon='phone'
                                onChange= {(e) =>{
                                    updateFormData(name, e.target.value)
                                }}/>
                            </Label>
                        );
                    } else if (input.type == 'email'){
                        content.push(
                            <Label>{input.label_text}<span class="bp4-text-muted"> {optional}</span>
                                <InputGroup key={JSON.stringify(input)} label={name} type={input.type} name={name} value={formData.name} placeholder={input.placeholder} required={!input.optional} //leftIcon='envelope' 
                                onChange= {(e) =>{
                                    updateFormData(name, e.target.value)
                                }}/>
                            </Label>
                        );
                    } else if (input.type == 'dropdown'){
                        let options = createDropdownOptions(input.data)
                        content.push(
                            <Label>{input.label_text}<span class="bp4-text-muted"> {optional}</span>
                                <Select key={JSON.stringify(input)} label={name} name={name} value={formData.name} placeholder={`Select ${input.label_text}`} required={!input.optional} options={options}
                                onChange= {(e) =>{
                                    updateFormData(name, e.value)
                                }}/>
                            </Label>
                        );
                    } else if (input.type == 'date'){
                        fd[name] = useState<Date>
                        setFormData(fd)
                        content.push(
                            <Label>{input.label_text}<span class="bp4-text-muted"> {optional}</span>
                                {/* <InputGroup key={JSON.stringify(input)} label={name} name={name} value={formData.name} placeholder={`Select ${input.label_text}`} required={!input.optional}
                                onChange= {(e) =>{
                                    updateFormData(name, e.value)
                                }}/> */}
                                <DayPicker
                                    mode="single"
                                    selected={formData.name}
                                    onChange= {(e) =>{
                                        updateDate(name, e.value)
                                    }}
                                    footer={footer.name}
                                />
                            </Label>
                        );
                    } else if (input.type == 'submit'){
                        fd[name] = input.data
                        setFormData(fd)
                        content.push(
                            // TODO: CHANGE THIS TO BE onSubmit IN THE FORM INSTEAD OF onClick HERE
                            <InputGroup type="submit" value="Submit" onClick={handleSubmitForm}/>
                            // <Button text="Submit"  />
                        );
                    }
            }
        }
      }

      setRenderForm(
            <FormGroup key={JSON.stringify(value)} >
                {content}
            </FormGroup>
        )
    }, []);

  const handleSubmitForm = e => {
    e.preventDefault()
    console.log(' form data ', formData)
    let submit_form_data = formData['submit_form']
    let actions = submit_form_data.actions
    for(let action of actions){
        console.log('action ', action)
        if(action == 'save_object'){
            let obj_name = submit_form_data.save_object_data.object_name
            let obj_data = Object.assign({},formData)
            delete obj_data.submit_form
            webrender.save_object(obj_name, obj_data)
        } else{
            webrender.buttonClick('action', action, webrender)
        }
    }
  }

  const createDropdownOptions = (data) => {
    let options = []
    for(let d of data.options){
        options.push({ 
            value: d, label: d
        })
    }

    return options
  }

    return(
      <>
        {/* TODO: keep in mind when testing: value is always set to this.state[fieldName], makes no sense, this.state[fieldName] is never set */}
        <div>
            {renderForm}
        </div>
      </>
    )
  }