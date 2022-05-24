import React, { useState, useEffect } from "react"

import { FormGroup, InputGroup, Label, MenuItem } from "@blueprintjs/core"
import { DatePicker, TimePicker } from "@blueprintjs/datetime"
import { MultiSelect } from "@blueprintjs/select";
import Select from 'react-select'

// TODO: add option to have multiple data objects saved of the same type (support for single and multiple)
export default function FormRender( {type, value, webrender} ){
    const [formType, ] = useState(value.type)
    const [inputs, ] = useState(value.inputs)
    const [formData, setFormData] = useState({})

    const [renderForm, setRenderForm] = useState([])
    
    const updateFormData = (name, data) => {
        let fd = formData

        fd[name] = data

        setFormData(fd)
    }

    const updateDate = (name, date) => {
        console.log('name ', name)
        console.log('date', date)
        date = JSON.stringify(date).split('T')[0].slice(1,)
        console.log('date ', date)
        let fd = formData

        fd[name] = date

        setFormData(fd)
    }

    const updateTime = (name, time) => {
        console.log('name ', name)
        console.log('time', time)
        time = JSON.stringify(time).split('T')[1].slice(0,-1)
        console.log('time ', time)
        let fd = formData

        fd[name] = time

        setFormData(fd)
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
                            <div key={JSON.stringify(input)}>
                                <Label>{input.label_text}<span className="bp4-text-muted"> {optional}</span>
                                    <InputGroup label={name} type={input.type} name={name} value={formData.name} placeholder={input.placeholder} required={!input.optional}
                                    onChange= {(e) =>{
                                        updateFormData(name, e.target.value)
                                    }}/>
                                </Label>
                            </div>
                        );
                    } else if (input.type == 'tel'){
                        let pattern = input.data.pattern
                        content.push(
                            <div key={JSON.stringify(input)}>
                            <Label>{input.label_text}<span className="bp4-text-muted"> {optional}</span>
                                <InputGroup label={name} type={input.type} name={name} value={formData.name} pattern={pattern} placeholder={input.placeholder} required={!input.optional} //leftIcon='phone'
                                onChange= {(e) =>{
                                    updateFormData(name, e.target.value)
                                }}/>
                            </Label>
                            </div>
                        );
                    } else if (input.type == 'email'){
                        content.push(
                            <div key={JSON.stringify(input)}>
                            <Label>{input.label_text}<span className="bp4-text-muted"> {optional}</span>
                                <InputGroup label={name} type={input.type} name={name} value={formData.name} placeholder={input.placeholder} required={!input.optional} //leftIcon='envelope' 
                                onChange= {(e) =>{
                                    updateFormData(name, e.target.value)
                                }}/>
                            </Label>
                            </div>
                        );
                    } else if (input.type == 'select'){
                        let options = createDropdownOptions(input.data)
                        content.push(
                            // <>
                            // <Label>{input.label_text}<span className="bp4-text-muted"> {optional}</span></Label>
                            //     <Select key={JSON.stringify(input)} label={name} name={name} value={formData.name} placeholder={`Select ${input.label_text}`} required={!input.optional} items={options} itemRenderer={renderMenuItems}
                            //     onItemSelect= {(e) =>{
                            //         console.log('e ', e)
                            //         // updateFormData(name, e.value)
                            //     }}>
                            //         <Button
                            //             text={formData[name] ? formData[name] : `please select ${input.label_text}`}
                            //             rightIcon="double-caret-vertical"
                            //         />
                            //     </Select><br/><br/>
                            // </>
                            <div key={JSON.stringify(input)}>
                            <Label>{input.label_text}<span className="bp4-text-muted"> {optional}</span></Label>
                             <Select label={name} name={name} value={formData.name} placeholder={`Select ${input.label_text}`} required={!input.optional} options={options}
                             onChange= {(e) =>{
                                 console.log('e ', e)
                                 updateFormData(name, e.value)
                            }}/><br/>
                            </div>

                        );
                    } else if (input.type == 'multi_select'){
                        let options = createDropdownOptions(input.data)
                        content.push(
                            <div key={JSON.stringify(input)}>
                            <Label>{input.label_text}<span className="bp4-text-muted"> {optional}</span></Label>
                                <MultiSelect label={name} name={name} value={formData.name} placeholder={`Select ${input.label_text}`} required={!input.optional} 
                                items={options} 
                                itemRenderer={renderMenuItems}
                                noResults={<MenuItem disabled={true} text="No results" />}
                                
                                    onItemSelect= {(e) =>{
                                        console.log('e ', e)
                                        // updateFormData(name, e.value)
                                    }}>
                                        {/* <Button
                                            text={formData[name] ? formData[name] : `please select ${input.label_text}`}
                                            rightIcon="double-caret-vertical"
                                        /> */}
                                </MultiSelect><br/>
                            </div>

                        );
                    } else if (input.type == 'date'){
                        // fd[name] = ''
                        // setFormData(fd)
                        content.push(
                            <div key={JSON.stringify(input)}>
                                <Label>{input.label_text}<span className="bp4-text-muted"> {optional}</span></Label>
                                <DatePicker
                                    highlightCurrentDay={true}
                                    showActionsBar={true}
                                    value={formData.name}
                                    onChange= {(date) =>{
                                        updateDate(name, date)
                                    }}
                                />
                            </div>
                        );
                    } else if (input.type == 'time'){
                        // fd[name] = 'Select date'
                        // setFormData(fd)
                        content.push(
                            <div key={JSON.stringify(input)}>
                                <Label>{input.label_text}<span className="bp4-text-muted"> {optional}</span></Label>
                                <TimePicker
                                    showArrowButtons={true}
                                    useAmPm={true}
                                    value={formData.name}
                                    onChange= {(time) =>{
                                        updateTime(name, time)
                                    }}
                                />
                            </div>
                        );
                    }else if (input.type == 'submit'){
                        fd[name] = input.data
                        setFormData(fd)
                        content.push(
                            <InputGroup key={`submit_${value}`} intent="primary" type="submit" value="Submit"/> // onClick={handleSubmitForm}/>
                            // <Button text="Submit"  />
                        );
                    }
            }
        }
      }

      setRenderForm(
            <form onSubmit={handleSubmitForm} >
                <FormGroup key={JSON.stringify(value)} >
                    {content}
                </FormGroup>
            </form>
        )
    }, []);

  const handleSubmitForm = e => {
      console.log('--------------- LOGGING HANDLE -----------')
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
            webrender.buttonClick('action', action)
        }
    }
    // webrender.processDisplay()
  }

  const renderMenuItems = (option, { handleClick, modifiers, query }) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        key={option.value}
        onClick={handleClick}
        text={option.label}
        shouldDismissPopover={false}
      />
    )
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