import React, { Component } from "react";
import { connect } from "react-redux";
import "../../stylesheets/pagination.css";
import "../../stylesheets/contacts.css";
import ReactPaginate from "react-paginate";
import $ from "jquery";
import moreimg from "../../images/showmore.svg";
import Loader from "react-loader-spinner";
import { getallcontacts } from "../../action/actionContacts";


class allContacts extends Component { 
  
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
   
    this.handlePageClick = this.handlePageClick.bind(this);
    this.getShortName = this.getShortName.bind(this); 
   
  } 

  getData(search) {

    this.setState({
      visibility: true,
    });  
    debugger;
    let params = {
      search: search,
      userid: this.props.userInfo.login.data.role[0].userid, 
      pagenumber: this.state.currentPage,
      pagesize: this.state.perPage,
    };
      
    this.props.getallcontacts(params).then(response => {
  
  if (response.data.status === 1) {
    if (response.data.resultset.length > 0) {
      $("#pagination").show();
    } else {
      $("#pagination").hide();
    }
    
      this.setState({
        pageCount: Math.ceil(response.data.totalrows / this.state.perPage),            
        tableData: response.data.resultset,
        visibility: false,             
      });   
  } else {
 
  }  

 }).catch(msg => {
         console.log("error"+msg);
    });
   
    
  }

  handlePageClick = (event) => {         
    this.setState(
      { currentPage:event.selected+1}
      ,
      () => {       
        this.getData();
      });
   }

  getShortName(fullName) {
    if (fullName != null) {
      fullName = fullName
        .split(" ")
        .map((n) => n[0])
        .join("");
      fullName = fullName.substring(0, 1);
    }
    return fullName;
  }

  render() {
    return (
     
      <div>
         <div className="loaderdiv">
         <Loader
              type="Rings"
              color="rgb(232, 135, 59)"
              height={100}
              width={100}
              visible={this.state.visibility}            
            />
            </div>
        <div className="table-responsive" style={{ width: "99%" }}>
          <table className="table" cellSpacing="0">
            <tbody>
              <tr className="rowstyle">
                <td className="gridheader">Member Name</td>
                <td className="gridheader">Mobile</td>
                <td className="gridheader">Employee ID</td>
                <td className="gridheader">Contact Type</td>
                <td className="gridheader">Action</td>
                <td className="gridheader text-center">Manage</td>
              </tr>
              { this.props.contactbooks.contact.data.resultset.map((tdata, i) => (
                <tr className="rowstyle" key={i}>                  
                  <td className="gridrow">
                    {tdata.picture !== "" && <img src={tdata.picture}></img>}
                    {tdata.picture === "" && (
                      <span className="profileImage">
                        {this.getShortName(tdata.username)}
                      </span>
                    )}
                    <span style={{ paddingLeft: "2rem" }}>
                      {tdata.username}
                    </span>
                  </td>

                  <td className="gridrow">{tdata.usermobile}</td>
                  <td className="gridrow">{tdata.userid}</td>
                  <td className="gridrow">
                    
                    {tdata.usertype<2 && <span>ICICI</span>}
                    </td>
                  <td className="gridrowview">View</td>
                  <td className="gridrowmore">
                    <img src={moreimg} alt="more" />
                  </td>
                </tr>
              )) }
              <tr className="text-right">
                <td colSpan="6">             

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
        
    );
  }  

  componentDidMount() {   
    if (this.props.userInfo.isLoggedin !== "Y") {
      let path = "login";
      this.props.history.push(path);
    } else {      
      this.getData("");
    }
  }
}

//export default allContacts;

const mapStatetoProps = (state) => {
  return state;
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     contactInfo: data => dispatch(getallcontacts(data)), 
//   };
// }; //

export default connect(mapStatetoProps,{getallcontacts})(allContacts);

//export default connect(mapStatetoProps, mapDispatchToProps,actionCreators,actionContacts)(allContacts);

 