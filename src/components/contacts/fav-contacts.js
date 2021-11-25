import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import Loader from "react-loader-spinner";
import {  getfavcontacts } from "../../action/actionContacts";
import *  as constants from "../../constants/config";
import removeimage from "../../images/x-circle.svg";
import star from "../../images/star.png";

const FavContacts = ({ getfavcontactlist, pageload, selectmember, selecteduserlist, removemember, state }) => {

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
    }, [pageload]);

    const loadcontactdata = (pageno) => {
        
        let params = {
            search: state.contactbooks.search,
            userid: state.userInfo.currentuniqueid,
            pagenumber: pageno,
            pagesize: constants.PAGE_SIZE,
        };

        if (selecteduserlist === undefined) {
            if (pageload === 1) {
              getfavcontactlist(params).then(response => {
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
            const updatedstate = state.contactbooks.favcheckedstate.map((item, index) =>
                index === position ? !item : item
            );
            state.contactbooks.favcheckedstate = updatedstate;
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
            <div className="row width98" style={{ padding: '12px' }} >
                <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    id="txtsearch"
                    onChange={oncontactchange}
                />
            </div>
            <div className="table-responsive" style={{ width: "99%" }}>
                <table className="table" cellSpacing="0">
                    <tbody>
                        <tr className="rowstyle">
                            <td></td>
                            <td className="gridheader">Member name</td>
                            <td className="gridheader">Mobile</td>
                            <td className="gridheader">Designation</td>
                            <td className="gridheader">Location</td>
                            <td className="gridheader">{selecteduserlist === undefined ? 'Select' : 'Remove'}</td>
                        </tr>
                        {contactlist.map((tdata, i) => (
                            <tr className="rowstyle" key={i}>
                                <td><img src={star} alt='' /></td>
                                <td className="gridrowcontact">
                                    {tdata.picture !== "" && <img alt="" src={tdata.picture}></img>}
                                    {tdata.picture === "" && (
                                        <span className="profileImage" style={{position:'relative'}}>
                                            {getShortName(tdata.username)}
                                        </span>
                                    )}
                                    <span style={{ paddingLeft: "2rem" }}>
                                        {tdata.username}
                                    </span>
                                </td>
                                <td className="gridrowcontact">{tdata.usermobile}</td>
                                <td className="gridrowcontact">{tdata.designation}</td>
                                <td className="gridrowcontact">{tdata.workplace}</td>
                                <td className="gridrowcontact">
                                    {selecteduserlist === undefined ? <input type="checkbox" style={{position:'relative'}} id={"chkselectcontact" + tdata.userid} checked={state.contactbooks.favcheckedstate[i]} onChange={(e) => onselectionofcontact(e, tdata, i)} /> :
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
        getfavcontactlist: data => dispatch(getfavcontacts(data)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(FavContacts);