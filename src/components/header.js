import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../action/actionindex";
import istudiologo from "../images/iStudio.svg";
import usrimg from "../images/user.svg";
import "../stylesheets/login.css";

class header extends Component {
  constructor(props) {
    super(props);
    this.signout = this.signout.bind(this);
  }
  signout(event) {
    this.props
      .logOut()
      .then(() => {
        if (this.props.userInfo.message === "SIGNED_OUT") {
          // let path = "recentcalls";
          // this.props.history.push(path);
          window.location.href = "/login";
        } else {
          event.preventDefault();
          alert("Invalid Session");
        }
      })
      .catch(() => {
        event.preventDefault();
      });
  }
  render() {
    return (
      <div>
        <nav className="navbar fixed-top navbar-light istudionavbar">
          <a className="navbar-brand" href="#">
            <img src={istudiologo} alt="iStudio Voice" />
          </a>
          <div
            className="form-inline nav-item dropdown"
            style={{ marginTop: "-1rem" }}
          >
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              id="fullName"
            >
              {this.props.userInfo.login.data.username}
            </a>
            <div
              id="profileImage"
              className="avatar avatar-sm brround cover-image"
            ></div>
            {/* <img
              src={usrimg}
              className="rounded-circle"
              alt="user"
              width="32px"
              height="32px"
            /> */}

            <div
              className="dropdown-menu  dropdown-menu-right"
              aria-labelledby="navbarDropdownMenuLink"
            >
              <a className="dropdown-item" href="#">
                Action
              </a>
              <a className="dropdown-item" href="#">
                Another action
              </a>
              <div className="dropdown-divider"></div>
              <button className="btn btn-default" onClick={this.signout}>
                Logout
              </button>
            </div>
          </div>
        </nav>
      </div>
    );
  }
  componentDidMount() {
    const fullName = document.getElementById("fullName").textContent;
    const intials = fullName
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase();
    document.getElementById("profileImage").innerHTML = intials;
  }
}
const mapStatetoProps = (state) => {
  return state;
};
export default connect(mapStatetoProps, actionCreators)(header);
