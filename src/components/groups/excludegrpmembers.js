import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { geteditgroup } from "../../action/actionContacts";
import *  as constants from "../../constants/config";
import ReactPaginate from "react-paginate";
import Loader from "react-loader-spinner";
import removeimage from "../../images/x-circle.svg";

const Excludegroupmembers = ({
    groupinfo,
    Addexcludemember,
    editgroupdata,
    excludeinfo,
    removeexcludemember,
    state
}) => {

    const loginData = state.userInfo.login.data;
    const [contactdata, setContactData] = useState([]);
    const [totalpages, setTotalpages] = useState(1);
    const [progressbar, setProgressbar] = useState(false);


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

    useEffect(() => {
        viewgroupdetails();
    }, [groupinfo, excludeinfo]);

    function viewgroupdetails() {

        state.contactbooks.search = '';
        let params = {
            search: state.contactbooks.search,
            userid: state.userInfo.currentuniqueid,
            pagenumber: constants.INITIALPAGE_NUMBER,
            pagesize: constants.PAGE_SIZE,
            groupcode: groupinfo.groupcode,
            grouptype: groupinfo.grouptype,
        };
        if (excludeinfo === undefined) {
            setProgressbar(true);
            if (groupinfo.grouptype > 0) {
                editgroupdata(params).then(response => {
                    setContactData(response.data.resultset);
                    setTotalpages(Math.ceil(response.data.totalrows / constants.PAGE_SIZE));
                    setProgressbar(false);
                });
            }
        }
        else {
            setProgressbar(true);
            setContactData(excludeinfo);
            setProgressbar(false);
        }

    }

    function handlePageClick(event) {
        setProgressbar(true);
        let params = {
            search: state.contactbooks.search,
            userid: state.userInfo.currentuniqueid,
            pagenumber: event.selected + 1,
            pagesize: constants.PAGE_SIZE,
            groupcode: groupinfo.groupcode,
            grouptype: groupinfo.grouptype,
        };

        editgroupdata(params).then(response => {
            setContactData(response.data.resultset);
            setProgressbar(false);
        });
    }

    function onmembersearch(event) {
        if (excludeinfo === undefined) {
            setProgressbar(true);
            let params = {
                search: event.target.value,
                userid: state.userInfo.currentuniqueid,
                pagenumber: constants.INITIALPAGE_NUMBER,
                pagesize: constants.PAGE_SIZE,
                groupcode: groupinfo.groupcode,
                grouptype: groupinfo.grouptype,
            };

            editgroupdata(params).then(response => {
                setContactData(response.data.resultset);
                setTotalpages(Math.ceil(response.data.totalrows / constants.PAGE_SIZE));
                setProgressbar(false);
            });
        }
        else {
            let value = event.target.value.toLowerCase();
            let result = [];

            result = excludeinfo.filter((data) => {
                return data.username.toLowerCase().search(value) != -1;
            });
            setContactData(result);
        }

    }

    function onselectionofcontact(event, data, position, groupinfo) {
        //alert(position);
        Addexcludemember(event, data, position, groupinfo);
    }

    return (
        <div>
            <div className="loaderdiv">
                <Loader
                    type="Rings"
                    color="rgb(232, 135, 59)"
                    height={100}
                    width={100}
                    visible={progressbar}
                />
            </div>
            <div id="divviewgroupmembers">

                <div className="row">
                    <div className="col-lg-7">
                        <ul className="backarrowul">
                            <li className="backarrowli"><span className="mintitlebot"> Excluded members from &nbsp;<b>{groupinfo.groupname}</b> </span> </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 text-right">
                        <input
                            className="form-control mr-sm-2 search"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            id="txtmemsearch"
                            onChange={onmembersearch}
                            style={{ width: "244px" }}
                        />
                    </div>
                </div>
                <div className="row col-lg-12 text-left"> &nbsp;</div>
                <div className="table-responsive" style={{ width: "99%", height: "60vh", overflow: "auto" }}>
                    <table className="table" cellSpacing="0">
                        <tbody>
                            <tr className="rowstyle" style={{ position: 'sticky', top: '-1px', zIndex: '10', backgroundColor: 'white' }}>
                                <td className="gridheader">Member Name</td>
                                <td className="gridheader">Mobile</td>
                                <td className="gridheader">Designation</td>
                                <td className="gridheader">Location</td>
                                <td className="gridheader">Select</td>
                            </tr>
                            {contactdata.map((tdata, i) => (
                                <tr className="rowstyle" key={i}>
                                    <td className="gridrowcontact">
                                        <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                                            <li style={{ float: 'left', padding: '0', margin: '0' }}>{tdata.picture !== "" && <img alt="" src={tdata.picture}></img>}
                                                {tdata.picture === "" && (
                                                    <span className="profileImage" style={{ position: 'relative' }}>
                                                        {getShortName(tdata.username)}
                                                    </span>
                                                )}</li>
                                            <li style={{ float: 'left', padding: '0', margin: '0' }}><span style={{ paddingLeft: "7px" }}>
                                                {tdata.username}
                                            </span></li>
                                        </ul>
                                    </td>
                                    <td className="gridrow">{tdata.usermobile}</td>
                                    <td className="gridrow">{tdata.designation}</td>
                                    <td className="gridrow">{tdata.workplace}</td>
                                    <td className="gridrow">
                                        {excludeinfo === undefined ? <input type="checkbox" style={{ position: 'relative' }} id={"chkselectcontact" + tdata.userid} checked={state.contactbooks.excludemembersstate[i]} onChange={(e) => onselectionofcontact(e, tdata, i, groupinfo)} /> :
                                            <img src={removeimage} alt='Remove' style={{ cursor: 'pointer' }} onClick={(e) => removeexcludemember(e, tdata, i, groupinfo)} />}
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
                <div style={{ float: 'right' }}>
                    {excludeinfo === undefined ?
                        <ReactPaginate
                            previousLabel={"<"}
                            nextLabel={">"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={totalpages}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={2}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}
                            id="pagination"
                        />
                        : ''}
                </div>
            </div>
        </div>
    );
}


const mapStateToProps = state => ({
    state: state,
});
const mapDispatchToProps = (dispatch) => {
    return {
        editgroupdata: data => dispatch(geteditgroup(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Excludegroupmembers);
