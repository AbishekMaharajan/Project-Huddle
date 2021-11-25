import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import "../../stylesheets/pagination.css";
import Loader from "react-loader-spinner";
import "../../stylesheets/contacts.css";
import icicgroup from "../../images/icicigroup.png";
import mygroup from "../../images/mygroup.png";
import rightarrow from "../../images/rightarrow.svg";
import { getallgroups } from "../../action/actionContacts";
import *  as constants from "../../constants/config";


const SharedGroup = ({ onViewGroup, Addgroup, groupList, state }) => {


    const [groupdata, setGroupdata] = useState([]);
    const [pagecount, setPagecount] = useState(0);
    const loginData = state.userInfo.login.data;
    const [imgdisable, setImgdisable] = useState(false);

    useEffect(() => {
        loadgroupdata(constants.INITIALPAGE_NUMBER);
    }, []);

    const loadgroupdata = (pageno) => {
         
        let params = {
            search: state.contactbooks.search,
            userid: loginData.role[0].userid,
            pagenumber: pageno,
            pagesize: constants.PAGE_SIZE,
        };

        groupList(params).then(response => {
            setGroupdata(response.data.resultset);
            setPagecount(Math.ceil(response.data.totalrows / constants.PAGE_SIZE));
             
        });

    }

    function OnNextPageClick(event) {
        loadgroupdata(event.selected + 1);
    }

    function onselectionofgroup(event, data, index) {
        if (event.target.checked) {
            setImgdisable(true);
        }
        else {
            setImgdisable(false);
        }
        Addgroup(event, data, index);
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
            <div className="table-responsive text-right" style={{ width: "99%" }}>
                <table className="table" cellSpacing="0">
                    <tbody>
                        <tr className="rowstyle">

                            <td className="gridheader">Group Name</td>
                            <td className="gridheader">Nos</td>
                            <td className="gridheader">Group Type</td>
                            <td className="gridheader">Select</td>
                            <td className="gridheader text-center">View</td>
                        </tr>

                        {groupdata.map((tdata, i) => (
                            <tr className="rowstyle" key={i}>

                                <td className="gridrow">{tdata.groupname}</td>
                                <td className="gridrow">{tdata.totalmembers}</td>
                                <td className="gridrow">
                                    {tdata.grouptype === 1 ? <span>ICICI group</span> : <span>My group</span>}
                                </td>
                                <td className="gridrowview">
                                    <input type="checkbox" style={{position:'relative'}} checked={state.contactbooks.groupcheckedstate[i]} onChange={(e) => onselectionofgroup(e, tdata, i)} />
                                </td>
                                <td className="gridrowmore">
                                    <button style={{backgroundColor:'transparent',border:'none'}} disabled = {!state.contactbooks.groupcheckedstate[i]} onClick={() => onViewGroup( tdata)} >
                                    <img src={rightarrow} alt="more" disabled = {state.contactbooks.groupcheckedstate[i]} />
                                    </button>
                                    {/* <img src={rightarrow} alt="more" disabled = {state.contactbooks.groupcheckedstate[i]} onClick={() => onViewGroup( tdata)} /> */}
                                </td>
                            </tr>
                        ))}


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
        groupList: data => dispatch(getallgroups(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SharedGroup);