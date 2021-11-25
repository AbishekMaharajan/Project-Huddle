import React, { Component } from "react";
import { connect } from "react-redux";
//import * as actionCreators from "../action/actionindex";
import { getallcontacts } from "../action/actionContacts";
import "../stylesheets/pagination.css";
import "../stylesheets/contacts.css";
import Header from "./header";
import Sidebar from "./sidebar";
import axios from "axios";
 
import $, { isPlainObject } from "jquery";
import Loader from "react-loader-spinner";
import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";
import AllContacts from "./contacts/all-contacts";
import FavContacts from "./contacts/fav-contacts";
import *  as constants from "../constants/config";

class contacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 1,
      tableData: [],
      orgtableData: [],
      perPage: 10,
      currentPage: 1,
      visibility:true,
    };
    this.oncontactchange=this.oncontactchange.bind(this);
  }
 
  oncontactchange(event)
  {
    let params = {
      search: event.target.value,
      userid: this.props.userInfo.login.data.role[0].userid, 
      pagenumber: this.state.currentPage,
      pagesize: this.state.perPage,
    };
      
    this.props
    .getallcontacts(params
).then(response => {
 
  if (response.data.status === 1) {
   
  } else {
 
  }
  

})
    .catch(msg => {
         console.log("error"+msg);
    });
  }

  render() {
     
    return (
      <div>
        <Header />
        <Sidebar />
        <ReactNotification />
        <div id="content">
          <div className="loaderdiv">
            {/* <Loader
              type="Rings"
              color="rgb(232, 135, 59)"
              height={100}
              width={100}
              // timeout={30000} //3 secs
              visible={this.state.visibility}
            /> */}
          </div>
          <nav
            className="navbar navbar-expand-lg navbar-light bg-light nav-bar-istudio"
            style={{ paddingTop: "15px", boxShadow: "none" }}
          >
            <div className="container-fluid container-fluid-istudio">
              <i className="fas fa-align-left"></i>
              <span className="title">Contacts</span>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="nav navbar-nav ml-auto">
                  <li className="nav-item active">
                    <button
                      type="button"
                      className="btn btn-outline-danger_new btnupdatecancel btncommon"
                    >
                      Bulk upload contacts
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      type="button"
                      className="btn btn-outline-danger_new btnupdate btncommon"
                    >
                      Create new contact
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
                id="nav-fav-tab"
                data-toggle="tab"
                href="#nav-fav"
                role="tab"
                aria-controls="nav-fav"
                aria-selected="true"
              >
                Favourites
              </a>
              <a
                className="nav-item nav-link"
                id="nav-contact-tab"
                data-toggle="tab"
                href="#nav-contact"
                role="tab"
                aria-controls="nav-contact"
                aria-selected="false"
              >
                Contacts
              </a>
              <a
                className="nav-item nav-link"
                id="nav-mycontact-tab"
                data-toggle="tab"
                href="#nav-mycontact"
                role="tab"
                aria-controls="nav-mycontact"
                aria-selected="false"
              >
                My Contacts
              </a>
             
              <div
                className="form-inline"
                style={{ position: "absolute", right: "0" }}
              >
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  id="txtsearch"
                  onChange={this.oncontactchange}
                  style={{ width: "244px" }}
                />
              </div>
            </div>
          </nav>

          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-fav"
              role="tabpanel"
              aria-labelledby="nav-fav-tab"
            >
              {/* <FavContacts /> */}
            </div>
            <div
              className="tab-pane fade"
              id="nav-contact"
              role="tabpanel"
              aria-labelledby="nav-contact-tab"
            >
              <AllContacts />
            </div>
            <div
              className="tab-pane fade"
              id="nav-mycontact"
              role="tabpanel"
              aria-labelledby="nav-mycontact-tab"
            ></div>
          </div>
        </div>
      </div>
    );
  }
 
}
const mapStatetoProps = (state) => {
  return state;
};
const mapDispatchToProps = (dispatch) => {
return {
  contactInfo: data => dispatch(getallcontacts(data)), 
};
};
export default connect(mapStatetoProps,{getallcontacts})(contacts);
//export default contacts;
 