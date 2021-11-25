import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { geteditgroup } from "../../action/actionContacts";
import *  as constants from "../../constants/config";
import Sharedcontact from "../contacts/sharedcontact";
import backarrow from "../../images/backarrow.svg";

const Viewgroupmembers = ({ groupinfo, editgroupdata, cancelviewmembers, state }) => {

    const loginData = state.userInfo.login.data;
    const [contactdata, setContactData] = useState([]);
    const [totalpages, setTotalpages] = useState(1);

    useEffect(() => {
        viewgroupdetails();
    }, [groupinfo]);


    function viewgroupdetails() {
        console.log(groupinfo);
        state.contactbooks.search = '';
        let params = {
            search: state.contactbooks.search,
            userid: loginData.role[0].userid,
            pagenumber: constants.INITIALPAGE_NUMBER,
            pagesize: constants.PAGE_SIZE,
            groupcode: groupinfo.groupcode,
            grouptype: groupinfo.grouptype,
        };

        if (groupinfo.grouptype > 0) {
            editgroupdata(params).then(response => {
                setContactData(response.data.resultset);
                setTotalpages(Math.ceil(response.data.totalrows / constants.PAGE_SIZE));

            });
        }

    }

    function editnextpage(event) {

        let params = {
            search: state.contactbooks.search,
            userid: loginData.role[0].userid,
            pagenumber: event.selected + 1,
            pagesize: constants.PAGE_SIZE,
            groupcode: groupinfo.groupcode,
            grouptype: groupinfo.grouptype,
        };

        editgroupdata(params).then(response => {
            setContactData(response.data.resultset);
        });
    }

    function onmembersearch(event) {
        let params = {
            search: event.target.value,
            userid: loginData.role[0].userid,
            pagenumber: constants.INITIALPAGE_NUMBER,
            pagesize: constants.PAGE_SIZE,
            groupcode: groupinfo.groupcode,
            grouptype: groupinfo.grouptype,
        };

        editgroupdata(params).then(response => {
            setContactData(response.data.resultset);
            setTotalpages(Math.ceil(response.data.totalrows / constants.PAGE_SIZE));
        });
    }

    return (
        <div>
            <div id="divviewgroupmembers">
                <span className="mintitle">Groups / {groupinfo.groupname}</span>
                <div className="row">
                <div className="col-lg-6 text-left">

                    <ul className="backarrowul">
                        <li className="backarrowli"><img alt='' src={backarrow} onClick={cancelviewmembers} className="imgpointer" /></li>
                        <li className="backarrowli"><span className="groupviewheader">{groupinfo.groupname}</span></li>
                    </ul>
                    <ul className="backarrowul">
                        <li className="backarrowli"><span className="mintitlebot">Groupcode - {groupinfo.groupcode} </span> </li>
                        <li className="backarrowli"><span className="mintitlebot"> | Members - {groupinfo.totalmembers}</span></li>
                    </ul>
                </div>
                <div className="col-lg-6 text-right">
                    <ul className="backarrowul1">
                        <li className="backarrowli1"><input type="button" className="btngroup" value="Bulk Upload" /></li>
                        <li className="backarrowli1"><input type="button" className="btngroup" value="Delete" /></li>
                        <li className="backarrowli1" ><input type="button" className="btngroup" value="Edit Group" /></li>

                    </ul>
                </div>
                </div>
                <div className="row">
                    <div className="col-lg-9">

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
                <Sharedcontact handlePageClick={editnextpage} sharedcontacts={contactdata} totalpage={totalpages} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Viewgroupmembers);
