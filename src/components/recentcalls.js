import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../action/actionindex";
import Pagination from "react-js-pagination";

import imgleft from "../images/left.svg";
import imgfilter from "../images/filter.svg";
import imguser from "../images/user.svg";
import "../stylesheets/recentcalls.css";

import $ from "jquery";
import Header from "./header";
import Sidebar from "./sidebar";

class recentcalls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      activePage: 3,
    };
    this.gohome = this.gohome.bind(this);
  }
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }
  gohome(event) {
    let path = "dashboard";
    this.props.history.push(path);
  }
  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        <div id="content">
          <nav className="navbar navbar-expand-lg navbar-light bg-light nav-bar-istudio">
            <div className="container-fluid container-fluid-istudio">
              <i className="fas fa-align-left"></i>
              <span className="title">
                <img
                  src={imgleft}
                  className="headingimg"
                  alt="Go Home"
                  onClick={this.gohome}
                />
                ICICI regional call
              </span>
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
          <div className="table-responsive" style={{ width: "99%" }}>
            <table className="table table-borderless" cellSpacing="0">
              <thead>
                <tr>
                  <th align="left" width="30%">
                    <span className="participantscount">
                      Participants - 123
                    </span>
                  </th>
                  <th align="center" width="17%">
                    <div className="custom-control custom-switch">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customSwitch1"
                      />
                      <label
                        className="custom-control-label muterecord"
                        htmlFor="customSwitch1"
                      >
                        Mute all
                      </label>
                    </div>
                  </th>
                  <th align="center" width="18%">
                    <div className="custom-control custom-switch">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customSwitch2"
                      />
                      <label
                        className="custom-control-label muterecord"
                        htmlFor="customSwitch2"
                      >
                        Record call
                      </label>
                    </div>
                  </th>
                  <th align="center" width="35%">
                    <input
                      className="form-control mr-sm-2"
                      type="search"
                      placeholder="Search members"
                      aria-label="Search"
                      id="txtsearch"
                    />
                  </th>
                </tr>
              </thead>
            </table>
            <table className="table table-borderless" cellSpacing="0">
              <thead className="tableheader">
                <tr>
                  <th align="left" width="30%">
                    Member name
                  </th>
                  <th align="left" width="20%">
                    Mobile
                  </th>
                  <th align="left" width="20%">
                    Contact type
                    <img
                      src={imgfilter}
                      className="headingimg"
                      alt="filter"
                      // onClick={this.gohome}
                    />
                  </th>
                  <th align="left" width="15%">
                    Call status
                    <img
                      src={imgfilter}
                      className="headingimg"
                      alt="filter"
                      // onClick={this.gohome}
                    />
                  </th>
                  <th align="left" width="15%">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="rowstyle">
                  <td align="left" width="30%">
                    <img src={imguser} alt="User" height="30px" width="30px" />
                    <span className="membername">Nicholson</span>
                  </td>
                  <td align="left" width="20%">
                    <span className="mobilenumber">9876543210</span>
                  </td>
                  <td align="left" width="20%">
                    <span className="mobilenumber">ICICI contacts</span>
                  </td>
                  <td align="left" width="15%">
                    <span className="mobilenumber">Connected</span>
                  </td>
                  <td align="left" width="15%">
                    <span className="mobilenumber">9m</span>
                  </td>
                </tr>
                <tr className="rowstyle">
                  <td align="left" width="30%">
                    <img src={imguser} alt="User" height="30px" width="30px" />
                    <span className="membername">Moolchand vishvakarma</span>
                    <br />
                    <span className="spanerror">External</span>
                  </td>
                  <td align="left" width="20%">
                    <span className="mobilenumber">9876543210</span>
                  </td>
                  <td align="left" width="20%">
                    <span className="mobilenumber">ICICI contacts</span>
                  </td>
                  <td align="left" width="15%">
                    <span className="mobilenumber">Removed</span>
                  </td>
                  <td align="left" width="15%">
                    <span className="mobilenumber">18m 50s </span>
                  </td>
                </tr>
                <tr className="rowstyle">
                  <td align="left" width="30%">
                    <img src={imguser} alt="User" height="30px" width="30px" />
                    <span className="membername">Anish</span>
                  </td>
                  <td align="left" width="20%">
                    <span className="mobilenumber">9876543210</span>
                  </td>
                  <td align="left" width="20%">
                    <span className="mobilenumber">My contacts</span>
                  </td>
                  <td align="left" width="15%">
                    <span className="mobilenumber">Disconnected</span>
                  </td>
                  <td align="left" width="15%">
                    <span className="mobilenumber">5m</span>
                  </td>
                </tr>
                <tr className="rowstyle">
                  <td align="left" width="30%">
                    <img src={imguser} alt="User" height="30px" width="30px" />
                    <span className="membername">Ashish</span>
                  </td>
                  <td align="left" width="20%">
                    <span className="mobilenumber">9876543210</span>
                  </td>
                  <td align="left" width="20%">
                    <span className="mobilenumber">My contacts</span>
                  </td>
                  <td align="left" width="15%">
                    <span className="mobilenumber">Didn’t connect</span>
                  </td>
                  <td align="left" width="15%">
                    <span className="mobilenumber"></span>
                  </td>
                </tr>
                <tr className="rowstyle">
                  <td align="left" width="30%">
                    <img src={imguser} alt="User" height="30px" width="30px" />
                    <span className="membername">Avinash</span>
                  </td>
                  <td align="left" width="20%">
                    <span className="mobilenumber">9876543210</span>
                  </td>
                  <td align="left" width="20%">
                    <span className="mobilenumber">My contacts</span>
                  </td>
                  <td align="left" width="15%">
                    <span className="mobilenumber">Connected</span>
                  </td>
                  <td align="left" width="15%">
                    <span className="mobilenumber">12m 20s</span>
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
                      // firstPageText={
                      //   <i className="glyphicon glyphicon-chevron-left" />
                      // }
                      // lastPageText={
                      //   <i className="glyphicon glyphicon-chevron-right" />
                      // }
                      // prevPageText={<i className="glyphicon glyphicon-menu-left" />}
                      // nextPageText={<i className="glyphicon glyphicon-menu-right" />}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    // $("#sidebar").mCustomScrollbar({
    //   theme: "minimal",
    // });

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
}
const mapStatetoProps = (state) => {
  return state;
};
export default connect(mapStatetoProps, actionCreators)(recentcalls);
