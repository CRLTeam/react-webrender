import React, {Component} from 'react';
import axios from 'axios';
import { Collapse } from 'bootstrap';

export class Webrender extends Component {

    // Runs before component is mounted.
    constructor(props) {
        super(props);
        this.rawDisplayData = [];
        this.displayProcessed = [];
    }

    async buttonClick(button, actionID) {
        console.log("Button Pressed");

        await axios({
            method: "GET",
            url: "http://localhost:5000/callAction/55/0/action-7a9cf8/en-CA",
            headers: {
              "Content-Type": "application/json"
            }
        }).then(res => {
            this.rawDisplayData = res.data.displayObject;
            this.processDisplay();
            this.forceUpdate();
        });
    }

    // Converts the parameters in this.userDisplay into HTML and stores it in this.displayProcessed
    processDisplay() {
        this.displayProcessed = [];

        var displayLength = this.rawDisplayData.length

        for (var i = 0; i < displayLength; i++) {
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
                    this.displayProcessed.push(<p className="text-left text-justify">{ value.text }</p>)
                } else if (lowerKey === "image") {
                    this.displayProcessed.push(
                        <div className="text-center">
                            <img className="image-fluid m-2" style={{width: "500px", height: "auto", objectFit: "cover"}} src={value.src}/> 
                        </div>
                    );
                } else if (lowerKey === "button") {
                    this.displayProcessed.push(<button onClick={() => this.buttonClick(value.text, value.actionID)} type="button" className="btn btn-primary m-2 float-right" v-else-if="display_item.Button">{ value.text }</button>);
                }
            
            }

        }

        // for (const [key, value] of Object.entries(this.display)) {
        //     console.log(`${key}: ${value}`);
        //     for (const i in value){
        //         if (key === "Title") {
        //             this.displayProcessed.push(<h1 className="display-1">{ value[i] }</h1>);
        //         } else if (key === "Header") {
        //             this.displayProcessed.push(<h1 className="h1">{ value[i] }</h1>);
        //         } else if (key === "Text") {
        //             this.displayProcessed.push(<p className="text-left text-justify">{ value[i] }</p>)
        //         } else if (key === "Image") {
        //             this.displayProcessed.push(
        //                 <div className="text-center">
        //                     <img className="image-fluid m-2" style={{width: "500px", height: "auto", objectFit: "cover"}} src={value[i]}/> 
        //                 </div>
        //             );
        //         } else if (key === "Button") {
        //             this.displayProcessed.push(<button onClick={() => this.buttonClick(value[i], this.display.ActionID[i])} type="button" className="btn btn-primary m-2 float-right" v-else-if="display_item.Button">{ value[i] }</button>);
        //         }
        //     }
        // }

    }



    async componentDidMount() {
        await axios({
            method: "GET",
            url: "http://localhost:5000/currentUserStatus/55/0/en-CA",
            headers: {
              "Content-Type": "application/json"
            }
        }).then(res => {
            console.log(res.data.displayObject.displayData);
            this.rawDisplayData = res.data.displayObject;
        });

        console.log(this.rawDisplayData)

        this.processDisplay();

        // console.log(this.displayProcessed);

        this.forceUpdate();
    }

    render(){
        return(
            <>
                <div className="webrender">
                    {this.displayProcessed}
                </div>
            </>
        )
    }
}