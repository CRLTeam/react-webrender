import React from "react";
import logo from "./images/logo.png";
import "./App.css";
import axios from "axios";

import {Webrender} from './components/Webrender';

function App() {

  // axios.get("http://localhost:5000/")
  //   .then(res => {
  //     const display = res.data;
  //   });

  return (
    <>
      <div>
        <nav class="navbar navbar-light bg-light">
            <a class="navbar-brand" href="/">
              <img src={logo} alt="Company logo" class="nav-logo" style={{width: "50px", height: "50px"}} />
            </a>
            <ul class="nav">
              <li class="nav-item">
                  <a class="nav-link active" href="/" >Home</a>
              </li>
            </ul>
        </nav>
        <div class="container">
            <div class="row">
              <div class="col col-sm"></div>
                <div class="col text-center col-md">
                    <ul class="list-group list-group-flush">
                      <Webrender/>

                    </ul>
                </div>
              <div class="col col-sm"></div>
            </div>
        </div>
      </div>
      
    </>
  );
}

export default App;