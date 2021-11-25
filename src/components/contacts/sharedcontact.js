import React from "react";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import Loader from "react-loader-spinner";

const Sharedcontact = ({ sharedcontacts, handlePageClick, totalpage, state }) => {

    const getShortName = (fullName) => {
        if (fullName != null) {
            fullName = fullName
                .split(" ")
                .map((n) => n[0])
                .join("");
            fullName = fullName.substring(0, 1);
        }
        return fullName;
    }

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
            <div className="table-responsive" style={{ width: "99%" }}>
                <table className="table" cellSpacing="0">
                    <tbody>
                        <tr className="rowstyle">
                            <td className="gridheader">Member Name</td>
                            <td className="gridheader">Mobile</td>
                            <td className="gridheader">Employee ID</td>
                            <td className="gridheader">Designation</td>
                            <td className="gridheader">Location</td>
                            <td className="gridheader">Country</td>
                            <td className="gridheader">Contact Type</td>
                        </tr>
                        {sharedcontacts.map((tdata, i) => (
                            <tr className="rowstyle" key={i}>
                                <td className="gridrow">
                                    {tdata.picture !== "" && <img src={tdata.picture}></img>}
                                    {tdata.picture === "" && (
                                        <span className="profileImage">
                                            {getShortName(tdata.username)}
                                        </span>
                                    )}
                                    <span style={{ paddingLeft: "2rem" }}>
                                        {tdata.username}
                                    </span>
                                </td>
                                <td className="gridrow">{tdata.usermobile}</td>
                                <td className="gridrow">{tdata.usertype === 1 ? tdata.userid : ''}</td>
                                <td className="gridrow">{tdata.designation}</td>
                                <td className="gridrow">{tdata.workplace}</td>
                                <td className="gridrow">{tdata.country}</td>
                                <td className="gridrow">
                                    {tdata.usertype < 2 && <span>ICICI</span>}
                                </td>
                            </tr>
                        ))}
                        <tr className="text-right">
                            <td colSpan="7">

                                <ReactPaginate
                                    previousLabel={"<"}
                                    nextLabel={">"}
                                    breakLabel={"..."}
                                    breakClassName={"break-me"}
                                    pageCount={totalpage}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={2}
                                    onPageChange={handlePageClick}
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

const mapStateToProps = state => ({
    state: state,
});

export default connect(mapStateToProps)(Sharedcontact);