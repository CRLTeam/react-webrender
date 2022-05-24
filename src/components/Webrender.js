import React, {Component} from 'react';
import axios from 'axios';
import { Collapse } from 'bootstrap';
import { getRoles } from '@testing-library/react';

import InputRender from './renders/InputRender'
import ListRender from './renders/ListRender'
import ImageRender from './renders/ImageRender'
import VideoRender from './renders/VideoRender'
import MenuRender from './renders/MenuRender'
import TextRender from './renders/TextRender'
import ButtonRender from './renders/ButtonRender'
import SelectRender from './renders/SelectRender'

export class Webrender extends Component {

    // Runs before component is mounted.
    constructor(props) {
        super(props);

        this.state = {
            rawDisplayData: [],
            displayProcessed: [],
            instanceID: 0, // TODO: instanceID should be dynamic
            machineID: 0, // TODO: Update for machineID is yet to be implemented
            currentState: "",
            lang: "en-CA", // TODO: needs to be made dynamic
    
            // contextID: "3177", // TODO: contextID
            // contextID: "7794",
            contextID: "3850", // new menu test
            role: "default-role",
            serverName: "localhost:5000",
            mongoServer: "localhost:3001",
            state: {},
            allStates: '',
            data: {},
            // force re-render
            rerender: false
        };
      
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }


    /**
     * Calls an action when a button is pressed
     * @param {string} button       Button action name
     * @param {string} actionID     Action ID of pressed button 
     */
    async buttonClick(button, actionID) {
        console.log("Button Pressed");
        console.log(button);
        console.log(actionID);

        await axios({
            method: "GET",
            url: `http://${this.state.serverName}/callAction/${this.state.instanceID}/${this.state.machineID}/${actionID}/${this.state.lang}`,
            // url: `http://${this.serverName}/callGetAction/${this.instanceID}/${this.machineID}/${actionID}/${this.role}/${this.lang}`,
            headers: {
              "Content-Type": "application/json"
            }
        }).then(res => {
            // 
            console.log(res.data)
            this.setState({
                rawDisplayData: res.data.displayObject,
                currentState: res.data.currentState
            })
            console.log(this.state.rawDisplayData);
            // webrender.setState({
            // })
            this.processDisplay();
            // webrender.forceUpdate();
        }).catch(e => {
            console.log('error ', e)
        });
    }

    /**
     * Converts the data in state.rawDisplayData into HTML and stores it in state.displayProcessed
     */
    processDisplay() {
        let display = [];

        var displayLength = this.state.rawDisplayData.length
        
        // create all key arrays
        let textRenderKeys = ['title', 'header', 'text']
        let imageRenderKeys = ['image']
        let buttonRenderKeys = ['button', 'radiobuttonlist']
        let menuRenderKeys = ['menu']
        let videoRenderKeys = ['video']
        let listRenderKeys = ['checkboxlist', 'list']
        let selectRenderKeys = ['dropdownselect']
        let inputRenderKeys = ['shorttextinput', 'paragraphinput', 'dateinput', 'timeinput', 'input']

        for (let i = 0; i < displayLength; i++) {
            // console.log(this.rawDisplayData[i])

            for (const [key, value] of Object.entries(this.state.rawDisplayData[i])) {
                console.log(`${key}: ${JSON.stringify(value)}`);
                let lowerKey = key.toLowerCase();
                console.log('LOWER KEY ', lowerKey)
                
                if (textRenderKeys.includes(lowerKey)) {

                    display.push(
                        <TextRender key={JSON.stringify(value)} type={lowerKey} value={value} />
                    );

                } else if (imageRenderKeys.includes(lowerKey)) {

                    display.push(
                        <ImageRender key={JSON.stringify(value)} type={lowerKey} value={value}/>
                    );

                } else if (buttonRenderKeys.includes(lowerKey)) {
                    // TODO: not sure what to do with : value['type']
                    display.push(
                        <ButtonRender key={JSON.stringify(value)} type={lowerKey} value={value} webrender={this}/>
                    );
                    
                } else if (menuRenderKeys.includes(lowerKey)) {

                    display.push(
                        <MenuRender key={JSON.stringify(value)} type={lowerKey} value={value} webrender={this}/>
                    );
        
                } else if (videoRenderKeys.includes(lowerKey)) {
                    
                    display.push(
                        <VideoRender key={JSON.stringify(value)} type={lowerKey} value={value} />
                    );
                    
                } else if (listRenderKeys.includes(lowerKey))  {

                    display.push(
                        <ListRender key={JSON.stringify(value)} type={lowerKey} value={value} webrender={this}/>
                    );

                } else if (selectRenderKeys.includes(lowerKey)) {

                    // TODO: test this
                    // TODO: this.state[nameofsomething] needs to be changed to use setState properly
                    display.push(
                        <SelectRender key={JSON.stringify(value)} type={lowerKey} value={value} webrender={this}/>
                    );

                } else if (inputRenderKeys.includes(lowerKey)) {
                    
                    display.push(
                        <InputRender key={JSON.stringify(value)} type={lowerKey} value={value} webrender={this}/>
                    );

                } else if (lowerKey === "extraDataText") {
                    display.push(
                        value.inputName
                    );
                }
            }

        }
        this.setState({
            displayProcessed: display
        })

    }

    /**
     * Create new instance when page is loaded
     */
    async componentDidMount() {
        // template and role hard coded for now, needs to be dynamic
        // var template = "12653896490267"; 
        // var role = "default-role";
        // var serverName = "localhost:5000";

        // await axios({
        //     method: "GET",
        //     url: (`http://${this.serverName}/createInstance/${this.contextID}/${this.role}/${this.lang}`),
        //     headers: {
        //       "Content-Type": "application/json"
        //     }
        await axios({
            method: "GET",
            url: (`http://${this.state.serverName}/createInstance/${this.state.contextID}/${this.state.role}/${this.state.lang}`),
            headers: {
              "Content-Type": "application/json"
            }
        }).then(res => {
            this.setState({
                instanceID: res.data.instanceID,
                currentState: res.data.currentState,
                rawDisplayData: res.data.displayObject,
                allStates: res.data.states
            })
        });

        this.processDisplay();
    }

    /**
     * called when input changed, not used anymore
     */
    handleInputChange(event) {
        const target = event.target;
        const name = target.name;

        const value = target.type === 'checkbox' || target.type === 'radio' ? target.checked : target.value; 
    
        this.setState({
          [name]: value
        });
        console.log(this.state);
    }
    
    /**
     * Called when submitting form, not used anymore
     */
    async handleSubmit(event) {
        event.preventDefault();

        // Send state data to server
        // http://localhost:5000/callAction/6582837/0/action-000/default-role/en-CA
        // TODO: actionID needs to be made dynamic
        console.log(this.state);
        await axios({
            method: "POST",
            url: `http://${this.state.serverName}/callPostAction/${this.state.instanceID}/${this.state.machineID}/action-000/${this.state.role}/${this.state.lang}`,
            headers: {
              "Content-Type": "application/json",
            }, 
            data: {
                data: this.state.state
            }
        }).then(res => {
            console.log(res);
        });

        return false;
    }

    /**
     * Call database to get instance's data object
     * @param {string} obj_name     Name of object to retrieve
     * @returns {Object}            Object that was retrieved 
     */
    async get_object(obj_name) {
        let data = ''

        await axios({
            method: 'GET',
            url: `http://${this.state.mongoServer}/api/getInstance/${this.state.instanceID}`
        }).then(res => {
            console.log('res data ', res.data)
            data = JSON.parse(res.data.data.data)
            this.setState({data: data})
        }).catch(e => {
            console.log('error ', e)
        });

        return data
    }

    async save_object(obj_name, obj_data) {
        console.log("saving obj");
        console.log('object name ', obj_name);
        console.log('object data ', obj_data);
        let newData = ''
        let currState= ''

        await axios({
            method: 'GET',
            url: `http://${this.state.mongoServer}/api/getInstance/${this.state.instanceID}`
        }).then(res => {
            console.log('res data ', res.data)
            newData = JSON.parse(res.data.data.data)
            currState = JSON.parse(res.data.data.states)
            newData[obj_name] = obj_data
        }).catch(e => {
            console.log('error ', e)
        });

        await axios({
            method: 'PUT',
            url: `http://${this.state.mongoServer}/api/updateInstanceData/${this.state.instanceID}`,
            data: {
                templateID: this.state.contextID,
                role: this.state.role,
                // context: data.context,
                states: currState,
                data: newData
            }
        }).then(async res => {
                console.log(res.data)
                // webrender.setState({
                //     rawDisplayData: res.data.displayObject
                // })
                // console.log(webrender.state.rawDisplayData);
                let data = JSON.parse(res.data.data.data)
                let rerender = JSON.stringify(this.state.rerender)
                this.setState({
                    data: data,
                    rerender: !JSON.parse(rerender)
                })
                this.processDisplay();
            }).catch(e => {
                console.log('error ', e)
            });
                
        // await axios({
        //     method: 'GET',
        //     url: `http://${this.state.mongoServer}/api/getInstance/${this.state.instanceID}`
        // }).then(res => {
        //     this.setState({
        //         instanceID: res.data.instanceID,
        //         currentState: res.data.currentState,
        //         rawDisplayData: res.data.displayObject,
        //         allStates: res.data.states
        //     })
        // });
    }


    render(){
        return(
            <>
                <div className="webrender">
                    {/* <form > */}
                        {console.log('DISPLAY PROCESSED IS ?????????? ', this.state.displayProcessed)}
                        {this.state.displayProcessed}
                            
                    {/* </form> */}
                </div>
            </>
        )
    }
}