import React, { Component } from "react";
import { connect } from "react-redux";
import { validateLogin } from "../action/actionindex";
import LoginHeader from "./loginheader";
import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";
import "../stylesheets/login.css";
import loginheaderimage from "../images/SignIn.svg";
import loginbutton from "../images/btnsignin.svg";
import $ from "jquery";
var CryptoJS = require("crypto-js");

class login extends Component {
  constructor(props) {
    super(props);
    this.empid = { value: "" };
    this.password = { value: "" };
    this.signin = this.signin.bind(this);
    this.empidchange = this.empidchange.bind(this);
    this.passwordchange = this.passwordchange.bind(this);
  }
  empidchange(event) {
    this.empid = { value: event.target.value };
  }
  passwordchange(event) {
    this.password = { value: event.target.value };
  }
  signin(event) {
    if (
      this.empid.value !== undefined &&
      this.password.value !== undefined &&
      this.empid.value !== "" &&
      this.password.value !== ""
    ) {
      var key = CryptoJS.enc.Utf8.parse("8080808080808080");
      var iv = CryptoJS.enc.Utf8.parse("8080808080808080");
      key = CryptoJS.enc.Utf8.parse("8080808080808080");

      var encryptedlogin = CryptoJS.AES.encrypt(
        CryptoJS.enc.Utf8.parse(this.empid.value),
        key,
        {
          keySize: 192 / 8,
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        }
      );

      $("#HDUser").val(encryptedlogin);

      var encryptedpassword = CryptoJS.AES.encrypt(
        CryptoJS.enc.Utf8.parse(this.password.value),
        key,

        {
          keySize: 128 / 8,
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        }
      );
      localStorage.setItem("userID", this.empid.value);
      $("#HDpass").val(encryptedpassword);

      $("#txtPassword").val(encryptedpassword);
      let params = {
        HDUser: $("#HDUser").val(),
        HDpass: $("#HDpass").val(),
      };

      this.props
        .validateLogin(params)
        .then((response) => {
          if (response.data.status === 1) {
            store.addNotification({
              title: "Success!",
              message: "Valid Login",
              type: "success",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 5000,
                onScreen: true,
              },
            });
            let path = "dashboard";
            this.props.history.push(path);
          } else {
            event.preventDefault();
            store.addNotification({
              title: "Warning!",
              message: "Invalid userName or password",
              type: "warning",
              insert: "top",
              container: "top-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 5000,
                onScreen: true,
              },
            });
          }
        })
        .catch((msg) => {
          // console.log("error"+msg);
        });
    } else {
      event.preventDefault();
      store.addNotification({
        title: "Error!",
        message: "Please Enter userid and password",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
    }
  }
  render() {
    return (
      <div>
        <ReactNotification />
        <LoginHeader />
        <div className="h-100 d-flex justify-content-center align-items-center">
          <form className="signincontainer" method="post">
            <div className="card-body">
              <div
                className="card-title text-center"
                style={{ paddingBottom: "1rem" }}
              >
                <img src={loginheaderimage} alt="Login" />
              </div>
              <div className="input-icon form-group wrap-input">
                <span className="input-icon-addon search-icon">
                  <i className="mdi mdi-cellphone-iphone"></i>
                </span>
                <input
                  type="text"
                  className="form-control number-only"
                  placeholder="Employee ID"
                  id="txtempid"
                  autoComplete="off"
                  required
                  onChange={this.empidchange}
                  tabIndex="1"
                />
                <input type="hidden" id="HDUser"></input>
              </div>
              <div className="input-icon form-group wrap-input">
                <span className="input-icon-addon search-icon">
                  <i className="zmdi zmdi-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-control mb-0"
                  id="pass1"
                  placeholder="Password"
                  required
                  onChange={this.passwordchange}
                  tabIndex="2"
                />
                <input type="hidden" id="HDpass"></input>
              </div>
              <div
                className="form-footer"
                style={{ paddingTop: "2rem", cursor: "pointer" }}
              >
                <img
                  src={loginbutton}
                  alt="Sign In"
                  loading=""
                  onClick={this.signin}
                  tabIndex="3"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

// const mapStatetoProps = (state) => {
//   return state;
// };

const mapDispatchToProps = (dispatch) => {
  return {
    userInfo: (data) => dispatch(validateLogin(data)),
  };
};

export default connect(null, { validateLogin })(login);
