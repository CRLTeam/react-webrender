import React, {Component} from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import ReactPlayer from 'react-player'
import { Collapse } from 'bootstrap';
import { getRoles } from '@testing-library/react';

export class Webrender extends Component {

    // Runs before component is mounted.
    constructor(props) {
        super(props);
        this.rawDisplayData = [];
        this.displayProcessed = [];
        this.instanceID = 0; // TODO: instanceID should be dynamic
        this.machineID = 0; // TODO: Update for machineID is yet to be implemented
        this.currentState = "";
        this.lang = "en-CA"; // TODO: needs to be made dynamic

        this.contextID = "12653896490267"; // TODO: contextID
        this.role = "default-role";
        this.serverName = "localhost:5000";

        this.state = {};
      
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }



    // Calls an action when a button is presed (also applied when menu option is pressed)
    async buttonClick(button, actionID) {
        console.log("Button Pressed");
        console.log(button);
        console.log(actionID);

        await axios({
            method: "GET",
            url: `http://${this.serverName}/callGetAction/${this.instanceID}/${this.machineID}/${actionID}/${this.role}/${this.lang}`,
            headers: {
              "Content-Type": "application/json"
            }
        }).then(res => {
            console.log(res.data.data)
            this.rawDisplayData = res.data.displayObject;
            console.log(this.rawDisplayData);
            this.currentState = res.data.currentState;
            this.processDisplay();
            this.forceUpdate();
        });
    }

    // Converts the data in this.rawDisplayData into HTML and stores it in this.displayProcessed
    processDisplay() {
        this.displayProcessed = [];

        var displayLength = this.rawDisplayData.length

        for (let i = 0; i < displayLength; i++) {
            // console.log(this.rawDisplayData[i])

            for (const [key, value] of Object.entries(this.rawDisplayData[i])) {
                // console.log(`${key}: ${value}`);
                var lowerKey = key.toLowerCase();
                // console.log(value)
                if (lowerKey === "title") {
                    this.displayProcessed.push(<h1 className="display-1">{ value.text }</h1>);
                } else if (lowerKey === "header") {
                    this.displayProcessed.push(<h1 className="h1">{ value.text }</h1>);
                } else if (lowerKey === "text") {
                    this.displayProcessed.push(<p className="text-left text-justify">{ value.text }</p>);
                } else if (lowerKey === "image") {
                    this.displayProcessed.push(
                        <div className="text-center">
                            <img className="image-fluid m-2" style={{width: "500px", height: "auto", objectFit: "cover"}} src={value.src}/> 
                        </div>
                    );
                } else if (lowerKey === "button") {
                    if (value["type"] === "post"){
                        this.displayProcessed.push(<input type="submit" value={value.text} className="btn btn-primary m-2 float-right" v-else-if="display_item.Button"/>);
                    } else {
                        this.displayProcessed.push(<button onClick={() => this.buttonClick(value.text, value.actionID)} type="button" className="btn btn-primary m-2 float-right" v-else-if="display_item.Button">{ value.text }</button>);
                    } 
                    
                } else if (lowerKey === "menu") {
                    var dropdownContent = [];

                    for (let j = 0; j < value.options.length; j++) {
                        let text = (value.options[j][(j+1).toString()]["text"]);
                        let action = (value.options[j][(j+1).toString()]["action"]);

                        // console.log(text);
                        // console.log(action);
                        
                        dropdownContent.push(
                            <Dropdown.Item onClick={() => this.buttonClick(text.toString(), action.toString())}>{text}</Dropdown.Item>
                        );
                    }
                    this.displayProcessed.push(
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                Menu
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {dropdownContent}
                            </Dropdown.Menu>
                        </Dropdown>
                    );
                } else if (lowerKey === "video") {
                    console.log(value.src);
                    this.displayProcessed.push(
                        <ReactPlayer url={value.src} controls="true"></ReactPlayer>
                    );
                    
                } else if (lowerKey === "radiobuttonlist")  {
                    var radioButtons = [];
                    for (let i = 0; i < value.options.length; i++) {
                        let text = value.options[i].radioButton.text;
                        let isDefault = value.options[i].radioButton.isDefault;
                        if (isDefault === true) {
                            radioButtons.push(
                                <div className="form-check">
                                    <input class="form-check-input" type="radio" name={"radioButton"} id={"radioButton" + i} checked/>
                                    <label class="form-check-label" for={"radioButton" + i}>
                                        {text}
                                    </label>
                                </div> 
                            );
                        } else {
                            radioButtons.push(
                                <div className="form-check">
                                    <input class="form-check-input" type="radio" name={"radioButton" } id={"radioButton" + i}/>
                                    <label class="form-check-label" for={"radioButton" + i}>
                                        {text}
                                    </label>
                                </div> 
                            );
                        }
                        
                    }

                    this.displayProcessed.push(
                        <div className="form-check">
                            {radioButtons}
                        </div>

                    );
                } else if (lowerKey === "checkboxlist")  {

                    // TODO: Minselect/Maxselect client side verification for checkboxes
                    var checkboxes = [];
                    for (let i = 0; i < value.options.length; i++) {
                        let text = value.options[i].checkBox.text;
                            checkboxes.push(
                                <div className="form-check">
                                    <input class="form-check-input" type="checkbox" name="flexRadioDefault" id={"radioButton" + i}/>
                                    <label class="form-check-label" for={"radioButton" + i}>
                                        {text}
                                    </label>
                                </div> 
                            );
                        
                    }

                    this.displayProcessed.push(
                        <form>
                            {checkboxes}
                        </form>

                    );
                } else if (lowerKey === "dropdownselect") {
                    var options = [];
                    for (let i = 0; i < value.options.length; i++) {
                        let text = value.options[i].option.text;
                        console.log(text);
                        options.push(

                            <option value={text}>{text}</option>

                        );
                        
                    }

                    this.displayProcessed.push(
                        <form>
                            <select className="form-control">
                                {options}
                            </select>
                        </form>
                        
                    );
                } else if (lowerKey === "shorttextinput") {
                    let inputName = value.inputName;
                    let fieldName = value.fieldName;
                    this.displayProcessed.push(
                        <div className="form-group">
                            <label for={fieldName}>{inputName}</label>
                            <input type="text" class="form-control" value={this.state[fieldName]} onChange={this.handleInputChange} name={fieldName} id={fieldName} aria-describedby="Small input" placeholder={"Enter Text"}></input>
                        </div>
                        
                    );
                } else if (lowerKey === "paragraphinput") {
                    let inputName = value.inputName;
                    let fieldName = value.fieldName;
                    this.displayProcessed.push(
                        <div className="form-group">
                            <label for={fieldName}>{inputName}</label>
                            <textarea type="text" class="form-control" value={this.state[fieldName]} onChange={this.handleInputChange} name={fieldName} id={fieldName} aria-describedby="Large input" placeholder={"Enter Text"}></textarea>
                        </div>
                    );
                } else if (lowerKey === "dateinput") {
                    let inputName = value.inputName;
                    this.displayProcessed.push(
                        <div className="form-group">
                            <label for={inputName}>{inputName}</label>
                            <input type="date" class="form-control" id={inputName} aria-describedby="Date input"></input>
                        </div>
                    );
                } else if (lowerKey === "timeinput") {
                    let inputName = value.inputName;
                    this.displayProcessed.push(
                        <div className="form-group">
                            <label for={inputName}>{inputName}</label>
                            <input type="time" class="form-control" id={inputName} aria-describedby="Time input"></input>
                        </div>
                    );
                } 
            }

        }

    }

    async componentDidMount() {
        // template and role hard coded for now, needs to be dynamic
        // var template = "12653896490267"; 
        // var role = "default-role";
        // var serverName = "localhost:5000";

        await axios({
            method: "GET",
            url: (`http://${this.serverName}/createInstance/${this.contextID}/${this.role}/${this.lang}`),
            headers: {
              "Content-Type": "application/json"
            }
        }).then(res => {
            this.instanceID = res.data.instanceID;
            this.currentState = res.data.currentState;
            this.rawDisplayData = res.data.displayObject;
        });


        // console.log(this.rawDisplayData)

        this.processDisplay();

        // console.log(this.displayProcessed);

        this.forceUpdate();
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;

        const value = target.value; 
    
        this.setState({
          [name]: value
        });
        console.log(this.state);
    }
    
    async handleSubmit(event) {
        event.preventDefault();

        // Send state data to server
        // http://localhost:5000/callAction/6582837/0/action-000/default-role/en-CA
        // TODO: actionID needs to be made dynamic
        await axios({
            method: "POST",
            url: `http://${this.serverName}/callPostAction/${this.instanceID}/${this.machineID}/action-000/${this.role}/${this.lang}`,
            headers: {
              "Content-Type": "application/json",
            }, 
            data: {
                data: this.state
            }
        }).then(res => {
            console.log(res);
            // this.rawDisplayData = res.data.displayObject;
            // console.log(this.rawDisplayData);
            // this.currentState = res.data.currentState;
            // this.processDisplay();
            // this.forceUpdate();
        });

        return false;
    }


    render(){
        return(
            <>
                <div className="webrender">
                    <form onSubmit={this.handleSubmit}>
                        {this.displayProcessed}
                    </form>
                </div>
            </>
        )
    }
}