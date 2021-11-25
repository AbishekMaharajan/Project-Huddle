import React, { Component } from "react";
import istudiologo from "../images/iStudio.svg";
import "../stylesheets/login.css";

class loginHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <nav className="navbar fixed-top navbar-light istudionavbar">
          <a className="navbar-brand" href="#">
            <img src={istudiologo} alt="iStudio Voice" />
          </a>
        </nav>
      </div>
    );
  }
}

export default loginHeader;
