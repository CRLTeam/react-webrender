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
        this.instanceID = 0;
        this.machineID = 0; // TODO: Update for machineID is yet to be implemented
        this.currentState = "";
        this.lang = "en-CA"; // TODO: needs to be made dynamic
    }

    // Calls an action when a button is presed (also applied when menu option is pressed)
    async buttonClick(button, actionID) {
        console.log("Button Pressed");
        console.log(button);
        console.log(actionID);

        await axios({
            method: "GET",
            url: "http://localhost:5000/callAction/" + this.instanceID + "/" + this.machineID + "/" + actionID + "/" + this.lang,
            headers: {
              "Content-Type": "application/json"
            }
        }).then(res => {
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
                console.log(`${key}: ${value}`);
                var lowerKey = key.toLowerCase();
                console.log(value)
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
                    this.displayProcessed.push(<button onClick={() => this.buttonClick(value.text, value.actionID)} type="button" className="btn btn-primary m-2 float-right" v-else-if="display_item.Button">{ value.text }</button>);
                } else if (lowerKey === "menu") {
                    var dropdownContent = [];

                    for (let j = 0; j < value.options.length; j++) {
                        let text = (value.options[j][(j+1).toString()]["text"]);
                        let action = (value.options[j][(j+1).toString()]["action"]);

                        console.log(text);
                        console.log(action);
                        
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
                    this.displayProcessed.push(
                        <div className="form-group">
                            <label for={inputName}>{inputName}</label>
                            <input type="text" class="form-control" id={inputName} aria-describedby="Small input" placeholder={"Enter Text"}></input>
                        </div>
                        
                    );
                } else if (lowerKey === "shorttextinput") {
                    let inputName = value.inputName;
                    this.displayProcessed.push(
                        <div className="form-group">
                            <label for={inputName}>{inputName}</label>
                            <input type="text" class="form-control" id={inputName} aria-describedby="Small input" placeholder={"Enter Text"}></input>
                        </div>
                    );
                } else if (lowerKey === "paragraphinput") {
                    let inputName = value.inputName;
                    this.displayProcessed.push(
                        <div className="form-group">
                            <label for={inputName}>{inputName}</label>
                            <textarea type="text" class="form-control" id={inputName} aria-describedby="Large input" placeholder={"Enter Text"}></textarea>
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
        var template = "displayer"; 
        var role = "default-role";
        var serverName = "localhost:5000";

        await axios({
            method: "GET",
            url: ("http://" + serverName + "/createInstance/" + template + "/" + role + "/" + this.lang),
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

    render(){
        return(
            <>
                <div className="webrender">
                    <form>
                        {this.displayProcessed}
                    </form>
                </div>
            </>
        )
    }
}