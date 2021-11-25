import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actionCreators from "../action/actionindex";
import Pagination from "react-js-pagination";
import DatePicker from "react-datepicker";
import "../stylesheets/dashboard.css";
import imgmic from "../images/mic.svg";
import imgright from "../images/right.svg";
import imgclock from "../images/clock.svg";
import imgcall from "../images/call.svg";
import imgmsg from "../images/message.svg";
import imgclose from "../images/close.svg";

import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";

import $ from "jquery";
import Header from "./header";
import Sidebar from "./sidebar";

class dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      activePage: 3,
    };
    this.dateChange = this.dateChange.bind(this);
  }
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }
  dateChange(date) {
    this.setState({
      startDate: date,
    });
  }
  state = { showing: false };
  render() {
    const { showing } = this.state;
    return (
      <div>
        <Header />
        <Sidebar />
        <div id="content">
          <ReactNotification />
          <nav
            className="navbar navbar-expand-lg navbar-light bg-light nav-bar-istudio"
            style={{ paddingTop: "15px", boxShadow: "none" }}
          >
            <div className="container-fluid container-fluid-istudio">
              <i className="fas fa-align-left"></i>
              <span className="title">Dashboard</span>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="nav navbar-nav ml-auto">
                  <li className="nav-item active">
                    <button
                      type="button"
                      className="btn btn-outline-success macall btncommon"
                    >
                      Make Adhoc Call
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="btn btn-outline-danger schcall btncommon"
                    >
                      Schedule
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="btn btn-outline-info blastcall btncommon"
                    >
                      <div className="dropdown-toggle" data-toggle="dropdown">
                        Blast <b className="caret" />
                      </div>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <nav>
            <div
              className="nav nav-tabs nav-tabs-istuido"
              id="nav-tab"
              role="tablist"
            >
              <a
                className="nav-item nav-link active"
                id="nav-home-tab"
                data-toggle="tab"
                href="#nav-home"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                Upcoming activity
              </a>
              <a
                className="nav-item nav-link"
                id="nav-profile-tab"
                data-toggle="tab"
                href="#nav-profile"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false"
              >
                Recent activity
              </a>
            </div>
          </nav>

          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              <table className="table" cellSpacing="0">
              
                <tbody>
                  <tr className="rowstyle">
                    <td align="center" width="5%">
                      <img src={imgmic} alt="" />
                    </td>
                    <td align="left" width="40%">
                      <span className="conftitle">ICICI new regulations</span>
                      <br />
                      <span className="conftime">
                        Voice Blast sent at 12:51PM
                      </span>
                    </td>
                    <td align="left" width="40%">
                      <span className="conftime">Total:</span>
                      <span className="confmems">14</span>
                    </td>
                    <td align="left" width="10%">
                      <button
                        type="button"
                        className="btn btn-outline-dark btnedit"
                        onClick={() => this.setState({ showing: !showing })}
                      >
                        Edit
                      </button>
                    </td>
                    <td align="center" width="5%">
                      <img src={imgright} alt="view" />
                    </td>
                  </tr>
                  <tr className="rowstyle">
                    <td align="center" width="5%">
                      <img src={imgclock} alt="" />
                    </td>
                    <td align="left" width="40%">
                      <span className="conftitle">ICICI new regulations</span>
                      <br />
                      <span className="conftime">
                        Voice Blast sent at 12:51PM
                      </span>
                    </td>
                    <td align="left" width="40%">
                      <span className="conftime">Participants:</span>
                      <span className="confmems">14</span>
                    </td>
                    <td align="left" width="10%">
                      <button
                        type="button"
                        className="btn btn-outline-dark btnedit"
                        onClick={() => this.setState({ showing: !showing })}
                      >
                        Edit
                      </button>
                    </td>
                    <td align="center" width="5%">
                      <img src={imgright} alt="view" />
                    </td>
                  </tr>
                  <tr style={{ textAlign: "right" }}>
                    <td colSpan="5">
                      <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={1}
                        totalItemsCount={5}
                        pageRangeDisplayed={10}
                        onChange={this.handlePageChange.bind(this)}
                        hideFirstLastPages
                       
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="row"></div>
            </div>
            <div
              className="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            >
              <table className="table" cellSpacing="0">
                
                <tbody>
                  <tr className="rowstyle">
                    <td align="center" width="5%">
                      <img src={imgmic} alt="" />
                    </td>
                    <td align="left" width="50%">
                      <span className="conftitle">ICICI new regulations</span>
                      <span className="callendreason"></span>
                      <br />
                      <span className="conftime">
                        Voice Blast sent at 12:51PM
                      </span>
                    </td>
                    <td align="right" width="12%">
                      <span className="conftime">Not Listened:</span>
                      <span className="confmems">10%</span>
                    </td>
                    <td align="right" width="9%">
                      <span className="conftime">Partial:</span>
                      <span className="confmems">40%</span>
                    </td>
                    <td align="right" width="9%">
                      <span className="conftime">Listened:</span>
                      <span className="confmems">50%</span>
                    </td>
                    <td align="right" width="10%">
                      <span className="conftime">Total:</span>
                      <span className="confmems">40,000</span>
                    </td>
                    <td align="center" width="5%">
                      <Link to="recentcalls" className="">
                        <img src={imgright} alt="logo" title="vs" />
                      </Link>
                    </td>
                  </tr>
                  <tr className="rowstyle">
                    <td align="center" width="5%">
                      <img src={imgcall} alt="" />
                    </td>
                    <td align="left" width="50%">
                      <span className="conftitle">
                        Call Ended - ICICI regional call
                      </span>
                      <span className="callendreason"> Lasted 10 minutes </span>
                      <br />
                      <span className="conftime">
                        Started at 10:30 AM - Ended at 10:40 AM
                      </span>
                    </td>
                    <td align="right" width="12%">
                      <span className="conftime"></span>
                      <span className="confmems"></span>
                    </td>
                    <td align="right" width="9%">
                      <span className="conftime"></span>
                      <span className="confmems"></span>
                    </td>
                    <td align="right" width="9%">
                      <span className="conftime">Comments:</span>
                      <span className="confmems">12</span>
                    </td>
                    <td align="right" width="10%">
                      <span className="conftime">Total:</span>
                      <span className="confmems">14</span>
                    </td>
                    <td align="center" width="5%">
                      <img
                        src={imgright}
                        alt="view"
                        onClick={() => this.setState({ showing: !showing })}
                      />
                    </td>
                  </tr>
                  <tr className="rowstyle">
                    <td align="center" width="5%">
                      <img src={imgmsg} alt="" />
                    </td>
                    <td align="left" width="50%">
                      <span className="conftitle">ICICI new regulations</span>
                      <span className="callendreason"></span>
                      <br />
                      <span className="conftime">SMS sent at 12:51PM</span>
                    </td>
                    <td align="right" width="12%">
                      <span className="conftime"></span>
                      <span className="confmems"></span>
                    </td>
                    <td align="right" width="9%">
                      <span className="conftime">Delivered:</span>
                      <span className="confmems">98%</span>
                    </td>
                    <td align="right" width="9%">
                      <span className="conftime">Pending:</span>
                      <span className="confmems">5%</span>
                    </td>
                    <td align="right" width="10%">
                      <span className="conftime">Total:</span>
                      <span className="confmems">14</span>
                    </td>
                    <td align="center" width="5%">
                      <img
                        src={imgright}
                        alt="view"
                        onClick={() => this.setState({ showing: !showing })}
                      />
                    </td>
                  </tr>
                  <tr className="rowstyle">
                    <td align="center" width="5%">
                      <img src={imgcall} alt="-" />
                    </td>
                    <td align="left" width="50%">
                      <span className="conftitle">Call Ended</span>
                      <span className="callendreason"> Lasted 10 minutes </span>
                      <br />
                      <span className="conftime">
                        Started at 10:30 AM - Ended at 10:40 AM
                      </span>
                    </td>
                    <td align="right" width="12%">
                      <span className="conftime"></span>
                      <span className="confmems"></span>
                    </td>
                    <td align="right" width="9%">
                      <span className="conftime"></span>
                      <span className="confmems"></span>
                    </td>
                    <td align="right" width="9%">
                      <span className="conftime">Comments:</span>
                      <span className="confmems">12</span>
                    </td>
                    <td align="right" width="10%">
                      <span className="conftime">Total:</span>
                      <span className="confmems">14</span>
                    </td>
                    <td align="center" width="5%">
                      <img
                        src={imgright}
                        alt="view"
                        onClick={() => this.setState({ showing: !showing })}
                      />
                    </td>
                  </tr>
                  <tr className="rowstyle">
                    <td align="center" width="5%">
                      <img src={imgcall} />
                    </td>
                    <td align="left" width="50%">
                      <span className="conftitle">Call Ended</span>
                      <span className="callendreason"> Lasted 10 minutes </span>
                      <br />
                      <span className="conftime">
                        Started at 10:30 AM - Ended at 10:40 AM
                      </span>
                    </td>
                    <td align="right" width="12%">
                      <span className="conftime"></span>
                      <span className="confmems"></span>
                    </td>
                    <td align="right" width="9%">
                      <span className="conftime"></span>
                      <span className="confmems"></span>
                    </td>
                    <td align="right" width="9%">
                      <span className="conftime">Comments:</span>
                      <span className="confmems">12</span>
                    </td>
                    <td align="right" width="10%">
                      <span className="conftime">Total:</span>
                      <span className="confmems">14</span>
                    </td>
                    <td align="center" width="5%">
                      <img
                        src={imgright}
                        alt="view"
                        onClick={() => this.setState({ showing: !showing })}
                      />
                    </td>
                  </tr>
                  <tr style={{ textAlign: "right" }}>
                    <td colSpan="7">
                      <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={1}
                        totalItemsCount={5}
                        pageRangeDisplayed={10}
                        onChange={this.handlePageChange.bind(this)}
                        hideFirstLastPages
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div
            className="modal-footer"
            style={{ border: "none", justifyContent: "flex-start" }}
          >
            <div className="row">
              <div className="col-sm-4">
                <div className="card istudiocard">
                  <div className="card-header text-left istudiocard-header">
                    Ongoing Campaign
                  </div>
                  <div className="card-body text-center istudiocard-body">
                    <span>2</span>
                  </div>
                  <div className="card-footer text-muted text-center istudiocard-footer">
                    Campaigns
                  </div>
                </div>
              </div>
              <div className="col-sm-4"></div>
              <div className="col-sm-4">
                <div className="card istudiocard ">
                  <div className="card-header text-left istudiocard-header">
                    Access control
                  </div>
                  <div className="card-body text-center istudiocard-body">
                    <span>3</span>
                  </div>
                  <div className="card-footer text-muted text-center istudiocard-footer">
                    Pending requests
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <footer className="blockquote-footer">
            Someone famous in <cite title="Source Title">Source Title</cite>
          </footer> */}
        </div>

        {/* Modal popup */}
        <div
          id="sidebar-wrappernew"
          style={{ display: showing ? "block" : "none" }}
        >
          <div className="updatediv">
            <div className="row" style={{ margin: "0" }}>
              <div className="col-md-8">
                <span className="updatedivheader">
                  Edit ICICI new regulations
                </span>
              </div>
              <div className="col-md-4 userclose">
                <img
                  src={imgclose}
                  alt="close"
                  onClick={() => this.setState({ showing: !showing })}
                />
              </div>
            </div>
            <div className="row" style={{ margin: "0" }}>
              <div className="col-md-4">
                <div className="form-group">
                  <span className="captionspan">Meeting title</span>
                </div>
              </div>
              <div className="col-md-8">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control updatetext"
                    placeholder="Meeting title"
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <span className="captionspan">Select date</span>
                </div>
              </div>
              <div className="col-md-8">
                <div className="form-group">
                  {/* <input type="text" className="form-control updatetext" placeholder="Select date" autoComplete="off" /> */}
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.dateChange}
                    dateFormat="dd-MM-yyyy"
                    className="form-control updatetext"
                    id="txtdate"
                    placeholder="Select date"
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <span className="captionspan">Starting time</span>
                </div>
              </div>
              <div className="col-md-8">
                <div className="form-group">
                  {/* <input type="text" className="form-control updatetext" placeholder="Starting time" autoComplete="off" id="txttime"/> */}
                  {/* <DatePicker selected={this.state.startDate}    onChange={this.handleChange}     showTimeSelect    showTimeSelectOnly
      timeIntervals={15}      timeCaption="Time"      dateFormat="h:mm aa"    /> */}
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.dateChange}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={1}
                    timeCaption="Time"
                    dateFormat="hh:mm aa"
                    className="form-control updatetext"
                    id="txttime"
                    placeholder="Select time"
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <span className="captionspan">Duration</span>
                </div>
              </div>
              <div className="col-md-8">
                <div className="form-group">
                  {/* <input type="text" className="form-control updatetext" placeholder="Duration" autoComplete="off"/> */}
                  <select
                    className="form-control custom-select updatetext"
                    id="ddlduration"
                  >
                    <option value="0" defaultValue>
                      Select Duration
                    </option>
                    <option value="1">15 Mins</option>
                    <option value="2">30 Mins</option>
                    <option value="3">45 Mins</option>
                    <option value="4">60 Mins</option>
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <span className="captionspan">Repeat</span>
                </div>
              </div>
              <div className="col-md-8">
                <div className="form-group">
                  {/* <input type="text" className="form-control updatetext" placeholder="Repeat" autoComplete="off"/> */}
                  <select
                    className="form-control custom-select updatetext"
                    id="ddlrepeat"
                  >
                    <option value="0" defaultValue>
                      Select Repeat type
                    </option>
                    <option value="1">Does not repeat</option>
                    <option value="2">Weekly on Monday</option>
                    <option value="3">Monthly on the First Monday</option>
                    <option value="4">Every Monday and Friday</option>
                    <option value="5">Repeat on specific dates</option>
                    <option value="5">Custom</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <span className="captionspan">
                    Select file to share(If any)
                  </span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  {/* <input type="text" className="form-control updatetext" placeholder="Select file to share(If any)" autoComplete="off"/> */}
                  {/* <input type="file" onChange={this.onFileChange} className="form-control updatetext"/>  */}
                  {/* <input type="file" multiple={true} id='browser' style={{ display: 'none' }} ref={fileInput} onChange={processFiles} />
                     <button onClick={() => { document.getElementById('browser').click();}}>Browse</button> */}
                  <input
                    type="file"
                    multiple={true}
                    id="browser"
                    style={{ display: "none" }}
                  />
                  <button
                    onClick={() => {
                      document.getElementById("browser").click();
                    }}
                    className="form-control updatetext"
                    style={{ lineHeight: "0.5" }}
                  >
                    Choose file
                  </button>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group"></div>
              </div>
              <div className="col-md-8">
                <div className="form-group"></div>
              </div>
              <div className="col-md-4">
                <div className="form-group"></div>
              </div>
              <div className="col-md-8">
                <div className="form-group"></div>
              </div>
              <div className="col-md-4">
                <div className="form-group"></div>
              </div>
              <div className="col-md-8">
                <div className="form-group"></div>
              </div>
              <div className="col-md-4">
                <div className="form-group"></div>
              </div>
              <div className="col-md-8">
                <div className="form-group">
                  <button
                    type="button"
                    className="btn btn-outline-danger_new1 btnupdatecancel"
                    style={{ marginRight: "2rem" }}
                    onClick={() => this.setState({ showing: !showing })}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger_new btnupdate"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End */}
      </div>
    );
  }
  componentDidMount() {
    // $("#sidebar").mCustomScrollbar({
    //   theme: "minimal",
    // });
    // store.addNotification({
    //   title: "Welcome...!",
    //   message: this.props.userInfo.userName,
    //   type: "success",
    //   insert: "top",
    //   container: "top-right",
    //   animationIn: ["animate__animated", "animate__fadeIn"],
    //   animationOut: ["animate__animated", "animate__fadeOut"],
    //   dismiss: {
    //     duration: 5000,
    //     onScreen: true,
    //   },
    // });
    if (this.props.userInfo.isLoggedin != "Y") {
      let path = "login";
      this.props.history.push(path);
    }
    $("#sidebarCollapse").on("click", function () {
      // open or close navbar
      $("#sidebar").toggleClass("active");
      // close dropdowns
      $(".collapse.in").toggleClass("in");
      // and also adjust aria-expanded attributes we use for the open/closed arrows
      // in our CSS
      $("a[aria-expanded=true]").attr("aria-expanded", "false");
    });
  }

  // componentWillMount() {
  //   store.addNotification({
  //     title: "Success!",
  //     message: this.props.userInfo.userName,
  //     type: "success",
  //     insert: "top",
  //     container: "top-right",
  //     animationIn: ["animate__animated", "animate__fadeIn"],
  //     animationOut: ["animate__animated", "animate__fadeOut"],
  //     dismiss: {
  //       duration: 5000,
  //       onScreen: true,
  //     },
  //   });
  // }
}
const mapStatetoProps = (state) => {
  return state;
};
export default connect(mapStatetoProps, actionCreators)(dashboard);
