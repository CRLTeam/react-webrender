import React from "react";
import logo from "./images/logo.png";
import "./App.css";

import {Webrender} from './components/Webrender';

function App() {

  // axios.get("http://localhost:5000/")
  //   .then(res => {
  //     const display = res.data;
  //   });

  return (
    <>
      <div>
        <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="/">
              <img src={logo} alt="Company logo" className="nav-logo" style={{width: "50px", height: "50px"}} />
            </a>
            <ul className="nav">
              <li className="nav-item">
                  <a className="nav-link active" href="/" >Home</a>
              </li>
            </ul>
        </nav>
        <div className="container">
            <div className="row">
              <div className="col col-sm"></div>
                <div className="col text-center col-md">
                    <ul className="list-group list-group-flush">
                      <Webrender/>

                    </ul>
                </div>
              <div className="col col-sm"></div>
            </div>
        </div>
      </div>
      
    </>
  );
}

export default App;