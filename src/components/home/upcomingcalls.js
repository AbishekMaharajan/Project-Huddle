import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import imgmic from "../../images/mic.svg";
import imgright from "../../images/right.svg";
import imgclock from "../../images/clock.svg";
import imgcall from "../../images/call.svg";
import imgmsg from "../../images/message.svg";
import imgclose from "../../images/close.svg";
import { Link } from "react-router-dom";
import *  as constants from "../../constants/config";
import { getupcomingcalls } from "../../action/actionHome";
import ReactPaginate from "react-paginate";
import Loader from "react-loader-spinner";


const Upcomingcalls = ({
    getupcomingcalls,
    state
}) => {

    const [schedulecall, setShedulecall] = useState([]);
    const [pagecount, setPagecount] = useState(0);
    const [progress, setProgress] = useState(false);

    useEffect(() => {
        loadupcomingcallsdata(constants.INITIALPAGE_NUMBER);
    }, []);


    const loadupcomingcallsdata = (pageno) => {
        let params = {
            search: state.contactbooks.search,
            userid: state.userInfo.currentuniqueid,
            ownerid: state.userInfo.currentuniqueid,
            pagenumber: pageno,
            pagesize: constants.PAGE_SIZE,
            empid: "101010",
            channelcode: 0,
            roleid: state.userInfo.roleid
        };
        getupcomingcalls(
            params
        ).then(response => {
            setShedulecall(response.data.resultset);
            setPagecount(Math.ceil(response.data.totalrows / constants.PAGE_SIZE));
            setProgress(false);
            console.log(pagecount);
        });
    };

    function handlePageClick(event) {
        loadupcomingcallsdata(event.selected + 1);
    }

    return (
        <div>
            <div className="loaderdiv">
                <Loader
                    type="Rings"
                    color="rgb(232, 135, 59)"
                    height={100}
                    width={100}
                    visible={progress}
                />
            </div>
            <table className="table" cellSpacing="0">
                <tbody>
                    {schedulecall.map((tdata, i) => (
                        <tr className="rowstyle">
                            <td align="center" width="5%">
                                <img src={tdata.conftype === 'instant' ? imgcall : tdata.conftype === 'schedule' ? imgclock : tdata.conftype === 'sms' ? imgmsg : imgmic} alt="" />
                            </td>
                            <td align="left" width="50%">
                                <span className="conftitle"> {tdata.confname}</span>
                                <br />
                                <span className="callendreason">{tdata.confdescription}</span>                               
                            </td>
                            <td align="right" width="12%">

                            </td>

                            <td align="right" width="10%">
                                <span className="conftime">Participants:</span>
                                <span className="confmems">{tdata.totalmembers}</span>
                            </td>
                            
                            <td align="right" width="18%">
                                <input type="button" value="Edit" />
                            </td>

                            <td align="center" width="5%">
                                <Link to="recentcalls" className="">
                                    <img src={imgright} alt="logo" title="vs" />
                                </Link>
                            </td>
                        </tr>
                    ))}

                    <tr>
                        {pagecount > 0 ?
                            <td colSpan="6" align="right">

                                <ReactPaginate
                                    previousLabel={"<"}
                                    nextLabel={">"}
                                    breakLabel={"..."}
                                    breakClassName={"break-me"}
                                    pageCount={pagecount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={2}
                                    onPageChange={handlePageClick}
                                    containerClassName={"pagination"}
                                    subContainerClassName={"pages pagination"}
                                    activeClassName={"active"}
                                    id="pagination"
                                /></td>
                            : <td colSpan="6" align="center"><span align="center">No records found</span></td>}

                    </tr>

                </tbody>
            </table>
        </div >
    );

}

const mapStateToProps = state => ({
    state: state,
});

const mapDispatchToProps = (dispatch) => {
    return {
        getupcomingcalls: data => dispatch(getupcomingcalls(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Upcomingcalls);
