import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../action/actionindex";
import istudiologo from "../images/iStudio.svg";
import usrimg from "../images/user.svg";
import "../stylesheets/pagination.css";
import Header from "./header";
import Sidebar from "./sidebar";
// import Pagination from "react-js-pagination";
import ReactPaginate from "react-paginate";
import axios from "axios";
import $ from "jquery";
import { usePromiseTracker } from "react-promise-tracker";

import Loader from "react-loader-spinner";

class datatable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      tableData: [],
      orgtableData: [],
      perPage: 10,
      currentPage: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.loadMoreData();
      }
    );
  };

  loadMoreData() {
    const data = this.state.orgtableData;

    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      tableData: slice,
    });
  }
  render() {
    // const { promiseInProgress } = usePromiseTracker();
    return (
      <div>
        <Header />
        <Sidebar />

        <div id="content">
          <div className="loaderdiv">
            <Loader
              type="Rings"
              color="rgb(232, 135, 59)"
              height={100}
              width={100}
              // timeout={30000} //3 secs
              visible={this.state.visibility}
            />
          </div>
          <div className="table-responsive" style={{ width: "99%" }}>
            <table className="table" cellSpacing="0">
              <thead hidden>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Body</th>
              </thead>
              <tbody>
                {this.state.tableData.map((tdata, i) => (
                  <tr className="rowstyle">
                    <td>{tdata.confid}</td>
                    <td>{tdata.calleddate}</td>
                    <td>{tdata.duration}</td>
                    <td>{tdata.confmembers}</td>
                  </tr>
                ))}
                <tr className="text-right">
                  <td colSpan="4">
                    <ReactPaginate
                      previousLabel={"<"}
                      nextLabel={">"}
                      breakLabel={"..."}
                      breakClassName={"break-me"}
                      pageCount={this.state.pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={2}
                      onPageChange={this.handlePageClick}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      activeClassName={"active"}
                      id="pagination"
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
    this.getData();
  }

  getData() {
    this.setState({
      visibility: true,
    });
    const API_URL =
      "https://istudio.voicesnapforschools.com/rmcalling/api/VoIP/";
    let params = {
      mobilenumber: "8667716584",
    };
    axios.post(API_URL + "loadCompletedConference", params).then((res) => {
      var data = res.data;
      if (data.length > 0) {
        $("#pagination").show();
      } else {
        $("#pagination").hide();
      }
      var slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );

      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        orgtableData: res.data,
        tableData: slice,
      });
      this.setState({
        visibility: false,
      });
    });
  }
}

const mapStatetoProps = (state) => {
  return state;
};

export default connect(mapStatetoProps, actionCreators)(datatable);
