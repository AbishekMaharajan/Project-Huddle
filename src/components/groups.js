import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import AllGroups from "./groups/all-groups";
import Header from "./header";
import Sidebar from "./sidebar";
import { getallgroups, getfavouritegroupandcontacts, geteditgroup } from "../action/actionContacts";
import ReactNotification from "react-notifications-component";
import $ from 'jquery';
import Viewgroupmembers from "./groups/viewgroupmembers";
import *  as constants from "../constants/config";
import Creategroup from "./groups/creategroup";

const Groups = ({
  groupList,
  favList,
  state }) => {

  const loginData = state.userInfo.login.data;
  const controller = React.useRef();

  const [groupinfo, setGroupinfo] = useState({ groupcode: '', groupname: '', grouptype: 0, totalmembers: 0 });
  const [groupdata, setGroupdata] = useState([]);
  const [pagecount, setPagecount] = useState(0);
  const [pageload, setPageload] = useState(0);
  const [sidebar, setSidebar] = useState(1);
  useEffect(() => {
    $('#divviewmembers').hide();
    $('#divcreategroup').hide();
    fetchfavgroupList();
  }, []);

  const fetchfavgroupList = () => {

    state.contactbooks.progressbar = true;
    favList({
      search: state.contactbooks.search,
      userid: state.userInfo.currentuniqueid,
      pagenumber: constants.INITIALPAGE_NUMBER,
      pagesize: constants.PAGE_SIZE,
      group: 1
    }).then(response => {
      setGroupdata(response.data.resultset);
      setPagecount(Math.ceil(response.data.totalrows / constants.PAGE_SIZE));
    });
  }

  function mygrouptabclick(reqparam) {
    state.contactbooks.selectedtab = reqparam;
    if (reqparam === 'fav') {
      let params = {
        search: state.contactbooks.search,
        userid: state.userInfo.currentuniqueid,
        pagenumber: constants.INITIALPAGE_NUMBER,
        pagesize: constants.PAGE_SIZE,
        group: 1
      };

      favList(params).then(response => {
        setGroupdata(response.data.resultset);
        setPagecount(Math.ceil(response.data.totalrows / constants.PAGE_SIZE));
      });

    }
    else if (reqparam === 'group') {
      groupList({
        search: state.contactbooks.search,
        userid: state.userInfo.currentuniqueid,
        pagenumber: constants.INITIALPAGE_NUMBER,
        pagesize: constants.PAGE_SIZE,
      }).then(response => {
        setGroupdata(response.data.resultset);
        setPagecount(Math.ceil(response.data.totalrows / constants.PAGE_SIZE));
      })
        .catch(msg => {
        });
    }

  }

  function loadAPIData(searchdata, paramTab, currentpage) {

    if (controller.current) {
      controller.current.abort();
    }
    // Assign a new AbortController for the latest fetch to our useRef variable
    controller.current = new AbortController()
    const { signal } = controller.current;

    if (paramTab === "fav") {
      //setPage({ fav: currentpage });
      let params = {
        search: searchdata,
        userid: state.userInfo.currentuniqueid,
        pagenumber: currentpage,
        pagesize: constants.PAGE_SIZE,
        group: 1
      };

      favList(params).then(response => {
        setGroupdata(response.data.resultset);
        setPagecount(Math.ceil(response.data.totalrows / constants.PAGE_SIZE));
      });
    }
    else if (paramTab === "group") {
      //setPage({ group: currentpage });
      groupList({
        search: searchdata,
        userid: state.userInfo.currentuniqueid,
        pagenumber: currentpage,
        pagesize: constants.PAGE_SIZE,
      }, { signal }).then(response => {
        setGroupdata(response.data.resultset);
        setPagecount(Math.ceil(response.data.totalrows / constants.PAGE_SIZE));
      }).catch(msg => {
      });
    }
  }

  function ongroupchange(event) {
    //controller.current.abort();
    loadAPIData(event.target.value, state.contactbooks.selectedtab, 1);
  }

  function handlePageClick(event) {
    loadAPIData(state.contactbooks.search, state.contactbooks.selectedtab, event.selected + 1);
  }


  function editgroup(rowdata) {

    let groupcode = rowdata.groupcode === undefined ? rowdata.usermobile : rowdata.groupcode;
    let groupname = rowdata.groupname === undefined ? rowdata.username : rowdata.groupname;
    let grouptype = rowdata.grouptype;
    setGroupinfo({ groupcode: groupcode, groupname: groupname, grouptype: grouptype, totalmembers: rowdata.totalmembers });
    //setGroupName(groupname);
    state.contactbooks.search = '';

    $('#content').hide();
    $('#divviewmembers').show();
  }

  function cancelviewmembers() {
    $('#content').show();
    $('#divviewmembers').hide();
  }
  function creategroupclick() {
    setPageload(1);
    setSidebar(0);
    $('#content').hide();
    $('#divcreategroup').show();
  }
  function cancelgroupclick() {
    $('#content').show();
    setSidebar(1);
    $('#divcreategroup').hide();
    loadAPIData("", "groups", constants.INITIALPAGE_NUMBER)
  }

  return (
    <div>
      <Header />
      {sidebar === 1 ? <Sidebar /> : ''}
      <ReactNotification />
      <div id="content">
        <nav
          className="navbar navbar-expand-lg navbar-light bg-light nav-bar-istudio"
          style={{ paddingTop: "15px", boxShadow: "none" }}
        >
          <div className="container-fluid container-fluid-istudio">
            <i className="fas fa-align-left"></i>
            <span className="title">Groups</span>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="nav navbar-nav ml-auto">

                <li className="nav-item">
                  <button
                    type="button"
                    className="btn btn-outline-danger_new btnupdate btncommon"
                    onClick={creategroupclick}
                  >
                    Create new group
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
              onClick={() => mygrouptabclick('fav')}
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
              onClick={() => mygrouptabclick('group')}
            >
              Groups
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
                onChange={ongroupchange}
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
            {<AllGroups onViewGroup={editgroup} OnNextPageClick={handlePageClick} groupdata={groupdata} pagecount={pagecount} />}
          </div>
          <div
            className="tab-pane fade"
            id="nav-contact"
            role="tabpanel"
            aria-labelledby="nav-contact-tab"
          >
            {<AllGroups onViewGroup={editgroup} OnNextPageClick={handlePageClick} groupdata={groupdata} pagecount={pagecount} />}
          </div>

        </div>
      </div>

      <div id="divviewmembers" className="child">
        <Viewgroupmembers groupinfo={groupinfo} cancelviewmembers={cancelviewmembers} />
      </div>
      <div id="divcreategroup" className="childwithoutsidebar">
        <Creategroup cancelgroupclick={cancelgroupclick} pageload={pageload} />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  state: state,
});
const mapDispatchToProps = (dispatch) => {
  return {
    groupList: data => dispatch(getallgroups(data)),
    favList: data => dispatch(getfavouritegroupandcontacts(data)),
    editgroupdata: data => dispatch(geteditgroup(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Groups);