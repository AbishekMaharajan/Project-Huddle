import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import Loader from "react-loader-spinner";
import { getallcontacts } from "../../action/actionContacts";
import *  as constants from "../../constants/config";
import removeimage from "../../images/x-circle.svg";

const Contactaction = ({
    getcontactlist,
    pageload,
    selectmember,
    selecteduserlist,
    removemember,
    state
}) => {

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
    const [contactlist, setContactlist] = useState([]);
    const [pagecount, setPagecount] = useState(0);
    //const loginData = state.userInfo.login.data;

    useEffect(() => {
        loadcontactdata(constants.INITIALPAGE_NUMBER);
    }, [pageload, selecteduserlist]);

    const loadcontactdata = (pageno) => {

        let params = {
            search: state.contactbooks.search,
            userid: state.userInfo.currentuniqueid,
            pagenumber: pageno,
            pagesize: constants.PAGE_SIZE,
        };

        if (selecteduserlist === undefined) {
            if (pageload === 1) {
                getcontactlist(params).then(response => {
                    setContactlist(response.data.resultset);
                    setPagecount(Math.ceil(response.data.totalrows / constants.PAGE_SIZE));

                });
            }
        }
        else {
            setContactlist(selecteduserlist);

        }
    }
    function handlePageClick(event) {

        loadcontactdata(event.selected + 1);
    }
    function oncontactchange(event) {
        state.contactbooks.search = event.target.value;
        loadcontactdata(constants.INITIALPAGE_NUMBER);
    }

    function onselectionofcontact(event, data, position) {
        if (event.target.checked) {
            const updatedstate = state.contactbooks.checkedstate.map((item, index) =>
                index === position ? !item : item
            );
            state.contactbooks.checkedstate = updatedstate;
        }
        selectmember(event, data);
    }

    function removeselectedmember(event, data) {
        removemember(data);
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
            {selecteduserlist === undefined ?
                <div className="row" style={{ padding: '12px', float: 'right' }} >
                    <input
                        className="form-control mr-sm-2"
                        type="search"
                        placeholder="Search contacts"
                        aria-label="Search"
                        id="txtsearch"
                        onChange={oncontactchange}
                    />
                </div> : ''}
            <div className="table-responsive" style={{ width: "99%" }}>
                <table className="table" cellSpacing="0">
                    <tbody>
                        <tr className="rowstyle">
                            <td className="gridheader">Member name</td>
                            <td className="gridheader">Mobile</td>
                            <td className="gridheader">Designation</td>
                            <td className="gridheader">Location</td>
                            <td className="gridheader">{selecteduserlist === undefined ? 'Select' : 'Remove'}</td>
                        </tr>
                        {contactlist.map((tdata, i) => (
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
                                <td className="gridrowcontact">{tdata.usermobile}</td>
                                <td className="gridrowcontact">{tdata.designation}</td>
                                <td className="gridrowcontact">{tdata.workplace}</td>
                                <td className="gridrowcontact">
                                    {selecteduserlist === undefined ? <input type="checkbox" style={{ position: 'relative' }} id={"chkselectcontact" + tdata.userid} checked={state.contactbooks.checkedstate[i]} onChange={(e) => onselectionofcontact(e, tdata, i)} /> :
                                        <img src={removeimage} alt='Remove' style={{ cursor: 'pointer' }} onClick={(e) => removeselectedmember(e, tdata)} />}
                                </td>
                            </tr>
                        ))}

                        <tr className="text-right">
                            {(selecteduserlist === undefined) ?
                                <td colSpan="7" align={pagecount > 0 ? 'right' : 'center'}>
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
                                : <td colSpan="7" align="center">{selecteduserlist.length > 0 ? '' : <span align="center">No records found</span>}</td>}
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

const mapDispatchToProps = (dispatch) => {
    return {
        getcontactlist: data => dispatch(getallcontacts(data)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Contactaction);