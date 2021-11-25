import React from "react";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import "../../stylesheets/pagination.css";
import Loader from "react-loader-spinner";
import moreimg from "../../images/showmore.svg";
import "../../stylesheets/contacts.css";
import icicgroup from "../../images/icicigroup.png";
import mygroup from "../../images/mygroup.png";
import star from "../../images/star.png";

const AllGroups = ({ onViewGroup, OnNextPageClick, groupdata, pagecount, state }) => {
 
  return (

    <div>

      <div className="loaderdiv">
        <Loader
          type="Rings"
          color="rgb(232, 135, 59)"
          height={100}
          width={100}
          visible={state.contactbooks.progressbar}
        />
      </div>
      <div className="table-responsive text-right" style={{ width: "99%" }}>
        <table className="table" cellSpacing="0">
          <tbody>
            <tr className="rowstyle">
              <td className="gridheader"> {state.contactbooks.selectedtab === 'fav' ? '' : ''}</td>
              <td className="gridheader">Group Code</td>
              <td className="gridheader">Group Name</td>
              <td className="gridheader">Group Members</td>
              <td className="gridheader">Group Type</td>
              <td className="gridheader">Action</td>
              <td className="gridheader text-center">Manage</td>
            </tr>

            {groupdata.map((tdata, i) => (
              <tr className="rowstyle" key={i}>
                <td className="gridrow"> {state.contactbooks.selectedtab === 'fav' ? <img src={star} alt='' /> : ''}</td>
                <td className="gridrow">{tdata.groupcode === undefined ? tdata.usermobile : tdata.groupcode}</td>
                <td className="gridrow">
                  {tdata.grouptype === 1 ? <img src={icicgroup} alt='' /> : <img src={mygroup} alt='' />}
                  &nbsp;{tdata.groupname === undefined ? tdata.username : tdata.groupname}</td>
                <td className="gridrow">{tdata.totalmembers}</td>
                <td className="gridrow">
                  {tdata.grouptype === 1 ? <span>ICICI group</span> : <span>My group</span>}
                </td>
                <td className="gridrowview"><a href="#" onClick={() => onViewGroup(tdata)} >View</a></td>
                <td className="gridrowmore">
                  <img src={moreimg} alt="more" />
                </td>
              </tr>
            ))}

            {pagecount > 1 ?
              <tr className="text-right" >
                <td colSpan="6">
                  <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pagecount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={OnNextPageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                    id="pagination"
                  />
                </td>
              </tr>
              : <tr><td colSpan="6"></td></tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  );

}

const mapStateToProps = state => ({
  state: state,
});

export default connect(mapStateToProps)(AllGroups);