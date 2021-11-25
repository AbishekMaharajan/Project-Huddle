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
import { getrecentconferences } from "../../action/actionHome";
import ReactPaginate from "react-paginate";
import Loader from "react-loader-spinner";

const Recentcalls = ({
    getrecentcalls,
    state
}) => {

    const [callshistory, setCallshistory] = useState([]);
    const [pagecount, setPagecount] = useState(0);
    const [progress, setProgress] = useState(false);

    useEffect(() => {
        loadrecentcallsdata(constants.INITIALPAGE_NUMBER);
    }, []);

    const loadrecentcallsdata = (pageno) => {
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
        setProgress(true);
        getrecentcalls(
            params
        ).then(response => {

            setCallshistory(response.data.resultset);
            setPagecount(Math.ceil(response.data.totalrows / constants.PAGE_SIZE));
            setProgress(false);
        });
        
    };

    function handlePageClick(event) {
        loadrecentcallsdata(event.selected+1)
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
                    {callshistory.map((tdata, i) => (
                        <tr className="rowstyle">
                            <td align="center" width="5%">
                                <img src={tdata.conftype === 'instant' ? imgcall : tdata.conftype === 'schedule' ? imgclock : tdata.conftype === 'sms' ? imgmsg : imgmic} alt="" />
                            </td>
                            <td align="left" width="50%">
                                <span className="conftitle"> {tdata.confname}</span><span>&nbsp;Lasted&nbsp;{tdata.duration}</span>
                                <br />
                                <span className="callendreason">{tdata.confdescription}</span>
                                <span className="conftime">
                                  &nbsp;&nbsp;  {tdata.conftime}
                                </span>
                            </td>
                            <td align="right" width="12%">
                                {tdata.conftype === 'voiceblast' ? <span><span className="conftime">Not Listened:</span><span className="confmems">{(tdata.totalmembers - (tdata.delevered + tdata.listened + tdata.partial))}</span></span>
                                    : ''
                                }
                            </td>
                            <td align="right" width="9%">
                                {tdata.conftype === 'voiceblast' ?
                                    <span>
                                        <span className="conftime">Partial:</span>
                                        <span className="confmems">{tdata.partial}</span>
                                    </span>
                                    : tdata.conftype === 'sms' ?
                                        <span>
                                            <span className="conftime">Delivered:</span>
                                            <span className="confmems">{tdata.delevered}</span>
                                        </span>
                                        : ''
                                }
                            </td>
                            <td align="right" width="9%">
                                {tdata.conftype === 'voiceblast' ?
                                    <span>
                                        <span className="conftime">Listened:</span>
                                        <span className="confmems">{tdata.listened}</span>
                                    </span>
                                    : tdata.conftype === 'sms' ?
                                        <span>
                                            <span className="conftime">Pending:</span>
                                            <span className="confmems">{tdata.partial}</span>
                                        </span>
                                        : <span>
                                            <span className="conftime">Comments:</span>
                                            <span className="confmems">{tdata.comments}</span>
                                        </span>
                                }
                            </td>
                            <td align="right" width="10%">
                                <span className="conftime">Total:</span>
                                <span className="confmems">{tdata.totalmembers}</span>
                            </td>
                            <td align="center" width="5%">
                                <Link to="recentcalls" className="">
                                    <img src={imgright} alt="logo" title="vs" />
                                </Link>
                            </td>
                        </tr>
                    ))}

                    <tr>
                        <td colSpan="7" align="right">
                            {pagecount > 0 ?
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
                                />
                                : <span align="center">No records found</span>}
                        </td>
                    </tr>

                </tbody>
            </table>
        </div >
    );

}

const mapStateToProps = state => ({
    state: state,
});
/*
const mapDispatchToProps = (dispatch) => {
    return {
        getrecentcalls: data = dispatch(getrecentconferences(data)),
    };
};
*/
const mapDispatchToProps = (dispatch) => {
    return {
        getrecentcalls: data => dispatch(getrecentconferences(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Recentcalls);