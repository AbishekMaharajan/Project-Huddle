import React, { useState } from "react";
import backarrow from "../../images/backarrow.svg";
import Contactaction from "../contacts/contactaction";
import { connect } from "react-redux";
import SharedGroup from "./sharedgroup";
import SelectedGroups from "./selectedgroups";
import Excludegroupmembers from "./excludegrpmembers";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import FavContacts from "../contacts/fav-contacts";
import { creategroup } from "../../action/actionContacts";
import { store } from "react-notifications-component";

const Creategoup = ({
    cancelgroupclick,
    pageload,
    savegroup,
    state
}) => {

    const [vpageload, setVPageload] = useState(pageload);
    const [pagechange, setPagechange] = useState(0);
    var [selectedmember, setsSelectedmember] = useState([]);
    var [selectedcontactscount, setSelectedcontactscount] = useState(0);
    var [selectedgroupscount, setSelectedgroupscount] = useState(0);
    var [selectegroup, setSelectegroup] = useState([]);
    const [tab, setTab] = useState(1);
    const [newgroupname, setNewgroupname] = useState("");

    function selectmember(event, reqdata) {

        if (event.target.checked) {
            let iexists = 0;
            state.contactbooks.newgroup.selectedcontacts.forEach(post => {
                if (post.userid.includes(reqdata.userid)) {
                    iexists = 1;
                }
            })
            if (iexists === 0) {
                state.contactbooks.newgroup.selectedcontacts.push(reqdata);
                setsSelectedmember(state.contactbooks.newgroup.selectedcontacts);
                setVPageload(vpageload + 1);
            }
            setSelectedcontactscount(state.contactbooks.newgroup.selectedcontacts.length);
            calculateselectedmembers();
        }
        else {
            removemember(reqdata);
        }

    }



    function removemember(reqdata) {

        for (let currentindex = 0; currentindex < state.contactbooks.contact.data.resultset.length; currentindex++) {

            if (state.contactbooks.contact.data.resultset[currentindex].userid === reqdata.userid) {
                const updatedstate = state.contactbooks.checkedstate.map((item, index) =>
                    index === currentindex ? false : item
                );
                state.contactbooks.checkedstate = updatedstate;
                break;
            }
        }

        for (let i = 0; i < state.contactbooks.newgroup.selectedcontacts.length; i++) {
            if (state.contactbooks.newgroup.selectedcontacts[i].userid === reqdata.userid) {
                state.contactbooks.newgroup.selectedcontacts.splice(i, 1);
                break;
            }
        }
        setsSelectedmember(state.contactbooks.newgroup.selectedcontacts);
        setVPageload(vpageload + 1);
        setSelectedcontactscount(state.contactbooks.newgroup.selectedcontacts.length);
        calculateselectedmembers();
    }

    /* favourite contacts*/
    function selectfavouritemember(event, reqdata) {

        if (event.target.checked) {
            let iexists = 0;
            state.contactbooks.newgroup.selectedcontacts.forEach(post => {
                if (post.userid.includes(reqdata.userid)) {
                    iexists = 1;
                }
            })
            if (iexists === 0) {
                state.contactbooks.newgroup.selectedcontacts.push(reqdata);
                setsSelectedmember(state.contactbooks.newgroup.selectedcontacts);
                setVPageload(vpageload + 1);
            }
            setSelectedcontactscount(state.contactbooks.newgroup.selectedcontacts.length);
            calculateselectedmembers();
        }
        else {
            removefavouritemember(reqdata);
        }

    }

    function removefavouritemember(reqdata) {

        for (let currentindex = 0; currentindex < state.contactbooks.favcontact.data.resultset.length; currentindex++) {

            if (state.contactbooks.favcontact.data.resultset[currentindex].userid === reqdata.userid) {
                const updatedstate = state.contactbooks.favcheckedstate.map((item, index) =>
                    index === currentindex ? false : item
                );
                state.contactbooks.favcheckedstate = updatedstate;
                break;
            }
        }

        for (let i = 0; i < state.contactbooks.newgroup.selectedcontacts.length; i++) {
            if (state.contactbooks.newgroup.selectedcontacts[i].userid === reqdata.userid) {
                state.contactbooks.newgroup.selectedcontacts.splice(i, 1);
                break;
            }
        }
        setsSelectedmember(state.contactbooks.newgroup.selectedcontacts);
        setVPageload(vpageload + 1);
        setSelectedcontactscount(state.contactbooks.newgroup.selectedcontacts.length);
        calculateselectedmembers();
    }

    /** Group component */

    const [isOpen, setIsOpen] = useState(false);
    const [currentdata, setCurrentdata] = useState({});
    const [isexOpen, setIsexOpen] = useState(false);

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };

    const showExModal = () => {
        setIsexOpen(true);
    };

    const hideEXModal = () => {
        setIsexOpen(false);
    };

    function viewgroupmembers(data) {
        setCurrentdata(data);
        showModal();
    }

    function Addgroup(event, data, position) {

        if (event.target.checked) {
            const updatedstate = state.contactbooks.groupcheckedstate.map((item, index) =>
                index === position ? !item : item
            );
            state.contactbooks.groupcheckedstate = updatedstate;
        }

        if (event.target.checked) {
            let iexists = 0;

            state.contactbooks.newgroup.selectedgroups.forEach(post => {
                if (post.groupcode.includes(data.groupcode)) {
                    iexists = 1;
                }
            });

            if (iexists === 0) {
                let obj = {
                    groupcode: data.groupcode,
                    groupname: data.groupname,
                    grouptype: data.grouptype,
                    totalmembers: data.totalmembers,
                    selected: data.totalmembers,
                    excluded: 0
                };

                state.contactbooks.newgroup.selectedgroups.push(obj);
                setSelectegroup(state.contactbooks.newgroup.selectedgroups);
                setSelectedgroupscount(state.contactbooks.newgroup.selectedgroups.length);
                setPagechange(pagechange + 1);
                calculateselectedmembers();
            }
        }
        else {

            for (let currentindex = 0; currentindex < state.contactbooks.allgroupslist.data.resultset.length; currentindex++) {

                if (state.contactbooks.allgroupslist.data.resultset[currentindex].groupcode === data.groupcode) {
                    const updatedstate = state.contactbooks.groupcheckedstate.map((item, index) =>
                        index === currentindex ? false : item
                    );
                    state.contactbooks.groupcheckedstate = updatedstate;
                    break;
                }
            }

            for (let i = 0; i < state.contactbooks.newgroup.selectedgroups.length; i++) {
                if (state.contactbooks.newgroup.selectedgroups[i].groupcode === data.groupcode) {
                    state.contactbooks.newgroup.selectedgroups.splice(i, 1);
                    break;
                }
            }
            for (let i = 0; i < state.contactbooks.newgroup.exculdedcontacts.length; i++) {
                if (state.contactbooks.newgroup.exculdedcontacts[i].groupcode === data.groupcode) {
                    state.contactbooks.newgroup.exculdedcontacts.splice(i, 1);
                }
            }
            setSelectegroup(state.contactbooks.newgroup.selectedgroups);
            setSelectedgroupscount(state.contactbooks.newgroup.selectedgroups.length);
            setPagechange(pagechange + 1);
            calculateselectedmembers();
        }
    }

    /** Exclude members component */

    function Addexcludemember(event, data, position, groupdata) {
        if (event.target.checked) {
            const updatedstate = state.contactbooks.excludemembersstate.map((item, index) =>
                index === position ? !item : item
            );
            state.contactbooks.excludemembersstate = updatedstate;
        }

        if (event.target.checked) {
            let obj = {
                groupcode: groupdata.groupcode,
                groupname: groupdata.groupname,
                grouptype: groupdata.grouptype,
                userid: data.userid,
                usertype: data.usertype,
                username: data.username,
                usermobile: data.usermobile
            };
            state.contactbooks.newgroup.exculdedcontacts.push(obj);
            updateexclude(groupdata);
            setPagechange(pagechange + 1);
        }
        else {
            for (let currentindex = 0; currentindex < state.contactbooks.editgroup.data.resultset.length; currentindex++) {

                if (state.contactbooks.editgroup.data.resultset[currentindex].userid === data.userid) {
                    const updatedstate = state.contactbooks.excludemembersstate.map((item, index) =>
                        index === currentindex ? false : item
                    );
                    state.contactbooks.excludemembersstate = updatedstate;
                    break;
                }
            }

            for (let i = 0; i < state.contactbooks.newgroup.exculdedcontacts.length; i++) {
                if (state.contactbooks.newgroup.exculdedcontacts[i].userid === data.userid &&
                    state.contactbooks.newgroup.exculdedcontacts[i].groupcode === groupdata.groupcode &&
                    state.contactbooks.newgroup.exculdedcontacts[i].usertype === data.usertype) {

                    state.contactbooks.newgroup.exculdedcontacts.splice(i, 1);
                    break;
                }
            }

            updateexclude(groupdata);
            setPagechange(pagechange + 1);
        }
    }

    function updateexclude(groupdata) {
        let excludecount = 0;
        for (let index = 0; index < state.contactbooks.newgroup.exculdedcontacts.length; index++) {
            if (state.contactbooks.newgroup.exculdedcontacts[index].groupcode === groupdata.groupcode) {
                excludecount = excludecount + 1;
            }
        }
        for (let i = 0; i < state.contactbooks.newgroup.selectedgroups.length; i++) {
            if (state.contactbooks.newgroup.selectedgroups[i].groupcode === groupdata.groupcode) {
                state.contactbooks.newgroup.selectedgroups[i].excluded = excludecount;
                state.contactbooks.newgroup.selectedgroups[i].selected = (state.contactbooks.newgroup.selectedgroups[i].selected - excludecount);
                break;
            }
        }
        calculateselectedmembers();
    }

    const [excludeinfo, setExcludeinfo] = useState([]);
    var [totalselcontacts, setTotalselcontacts] = useState(0);
    var [exgroupinfo, setExgroupinfo] = useState({});

    var arrMembers = [];
    function viewexclude(event, data, position) {
        setExgroupinfo(data);
        arrMembers = [];
        for (let index = 0; index < state.contactbooks.newgroup.exculdedcontacts.length; index++) {
            if (state.contactbooks.newgroup.exculdedcontacts[index].groupcode === data.groupcode) {
                arrMembers.push(state.contactbooks.newgroup.exculdedcontacts[index]);
            }
        }
        setExcludeinfo(arrMembers);
        showExModal(true);

    }
    function removeexcludemember(event, data, position, groupdata) {
        for (let i = 0; i < state.contactbooks.newgroup.exculdedcontacts.length; i++) {
            if (state.contactbooks.newgroup.exculdedcontacts[i].userid === data.userid &&
                state.contactbooks.newgroup.exculdedcontacts[i].groupcode === groupdata.groupcode &&
                state.contactbooks.newgroup.exculdedcontacts[i].usertype === data.usertype) {

                state.contactbooks.newgroup.exculdedcontacts.splice(i, 1);
                break;
            }
        }
        var arrMembers = [];
        for (let index = 0; index < state.contactbooks.newgroup.exculdedcontacts.length; index++) {
            if (state.contactbooks.newgroup.exculdedcontacts[index].groupcode === data.groupcode) {
                arrMembers.push(state.contactbooks.newgroup.exculdedcontacts[index]);
            }
        }
        setExcludeinfo(arrMembers);
        updateexclude(groupdata);
    }

    function calculateselectedmembers() {
        let groupmembers = state.contactbooks.newgroup.selectedgroups.reduce((a, v) => a = a + v.selected, 0);
        let result = ((state.contactbooks.newgroup.selectedcontacts.length + groupmembers) - state.contactbooks.newgroup.exculdedcontacts.length)
        setTotalselcontacts(result);
    }

    function selectmemsearch(event) {
        if (tab === 1 || tab === 2) {
            let value = event.target.value.toLowerCase();
            let result = [];

            result = state.contactbooks.newgroup.selectedcontacts.filter((data) => {
                return data.username.toLowerCase().search(value) != -1;
            });
            setsSelectedmember(result);

            result = state.contactbooks.newgroup.selectedgroups.filter((data) => {
                return data.groupname.toLowerCase().search(value) != -1;
            });
            setSelectegroup(result);

        }
        /* else {
             let value = event.target.value.toLowerCase();
             let result = [];
 
             result = state.contactbooks.newgroup.selectedgroups.filter((data) => {
                 return data.groupname.toLowerCase().search(value) != -1;
             });
             setSelectegroup(result);
             
         }*/
    }

    /** Save group details to server */
    function Savegroupdetails() {

        if (newgroupname === "") {
            store.addNotification({
                title: "Warning!",
                message: "Please enter group name.",
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true,
                },
            });
        }
        else if (state.contactbooks.newgroup.selectedgroups.length === 0 &&
            state.contactbooks.newgroup.selectedcontacts.length === 0 &&
            state.contactbooks.newgroup.exculdedcontacts.length === 0) {
            store.addNotification({
                title: "Warning!",
                message: "Please select atleast one member.",
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true,
                },
            });
        }
        else {
            let params = {
                ownerid: state.userInfo.currentuniqueid,
                groupcode: 0,
                groupname: newgroupname,
                selectedgroups: state.contactbooks.newgroup.selectedgroups,
                selectedusers: state.contactbooks.newgroup.selectedcontacts,
                excludeusers: state.contactbooks.newgroup.exculdedcontacts
            }

            savegroup(params).then(response => {
                console.log(response);
                if (response.data.status === 1) {
                    state.contactbooks.newgroup.selectedgroups = [];
                    state.contactbooks.newgroup.selectedcontacts = [];
                    state.contactbooks.newgroup.exculdedcontacts = [];
                    store.addNotification({
                        title: "Warning!",
                        message: "Group created successfully!.",
                        type: "success",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                            duration: 5000,
                            onScreen: true,
                        },
                    });
                    cancelgroupclick();
                }
                else {
                    store.addNotification({
                        title: "Error!",
                        message: response.data.message,
                        type: "danger",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                            duration: 5000,
                            onScreen: true,
                        },
                    });
                }
            });
        }
    }

    return (
        <div>
            <div id="divviewmembers">
                <div className="row width100">
                    <div className="col-lg-12 text-left">
                        <span className="mintitle">Groups / Select group members</span>
                        <ul className="backarrowul">
                            <li className="backarrowli"><img alt='' src={backarrow} onClick={cancelgroupclick} className="imgpointer" /></li>
                            <li className="backarrowli"><span className="groupviewheader">Select Group members</span></li>
                        </ul>
                    </div>
                </div>
                <div className="row text-left creategrouptitle d-flex">
                    <div className="text-right" style={{ paddingTop: '8px', marginLeft: '27px' }} >Group name</div>
                    <div className="col-lg-4 col-md-4"><input type="text" style={{ marginLeft: '12px' }} maxLength="50" className="form-control" id="txtname" placeholder="Enter group name" onChange={(e) => setNewgroupname(e.target.value)} /></div>
                </div>
                <div className="row col-lg-12" style={{ height: '19px' }} ></div>
                <div className="row width98">
                    <ul className="backarrowul1">
                        <li className="groupli shadowdiv">
                            <div className="text-left">

                                <nav>
                                    <div
                                        className="nav nav-tabs nav-tabs-istuido"
                                        id="cnav-tab"
                                        role="tablist"
                                    >
                                        <a
                                            className="nav-item nav-link"
                                            id="nav-cfav-tab"
                                            data-toggle="tab"
                                            href="#nav-cfav"
                                            role="tab"
                                            aria-controls="nav-cfav"
                                            aria-selected="false"
                                        >
                                            Favourites
                                        </a>
                                        <a
                                            className="nav-item nav-link"
                                            id="nav-cgroup-tab"
                                            data-toggle="tab"
                                            href="#nav-cgroup"
                                            role="tab"
                                            aria-controls="nav-cgroup"
                                            aria-selected="false"
                                        >
                                            Groups
                                        </a>
                                        <a
                                            className="nav-item nav-link active"
                                            id="nav-ccontact-tab"
                                            data-toggle="tab"
                                            href="#nav-ccontact"
                                            role="tab"
                                            aria-controls="nav-ccontact"
                                            aria-selected="true"
                                        >
                                            Contacts
                                        </a>
                                    </div>
                                </nav>

                            </div>
                            <div className="tab-content" id="nav-tabContent" style={{ height: '53vh', overflowX: 'hidden', overflowY: 'auto' }}>
                                <div id="nav-cfav" className="tab-pane fade" role="tabpanel"
                                    aria-labelledby="nav-cfav-tab">
                                    <FavContacts pageload={pageload} selectmember={selectfavouritemember} />
                                </div>
                                <div id="nav-cgroup" className="tab-pane fade" role="tabpanel"
                                    aria-labelledby="nav-cgroup-tab">
                                    {<SharedGroup onViewGroup={viewgroupmembers} Addgroup={Addgroup} />}
                                </div>

                                <div id="nav-ccontact" className="tab-pane fade show active" role="tabpanel"
                                    aria-labelledby="nav-ccontact-tab">
                                    <Contactaction pageload={pageload} selectmember={selectmember} />
                                </div>
                            </div>
                        </li>
                        <li className="groupliright shadowdiv">
                            <div className="text-left">
                                <div className="row">
                                    <div className="col-lg-5 col-md-5"> <span className="selectedtitle">Selected members - {totalselcontacts}</span></div>
                                    <div className="col-lg-7 col-md-7"> <input
                                        className="form-control mr-sm-2"
                                        type="search"
                                        placeholder="Search members / groups"
                                        aria-label="Search"
                                        id="txtselectedsearch"
                                        onChange={selectmemsearch}
                                    />
                                    </div>
                                </div>
                                <nav>
                                    <div
                                        className="nav nav-tabs nav-tabs-istuido"
                                        id="nav-tab2"
                                        role="tablist"
                                    >
                                        <a
                                            className="nav-item nav-link active"
                                            id="nav-selected-member-tab"
                                            data-toggle="tab"
                                            href="#nav-selectedmember"
                                            role="tab"
                                            aria-controls="nav-selectedmember"
                                            aria-selected="true"
                                            onClick={() => setTab(1)}
                                        >
                                            Members - {selectedcontactscount}
                                        </a>
                                        <a
                                            className="nav-item nav-link"
                                            id="nav-contact-tab"
                                            data-toggle="tab"
                                            href="#nav-selectedgroup"
                                            role="tab"
                                            aria-controls="nav-selectedgroup"
                                            aria-selected="false"
                                            onClick={() => setTab(2)}
                                        >
                                            Groups - {selectedgroupscount}
                                        </a>

                                    </div>
                                </nav>
                                <div className="tab-content" id="nav-tabContent" style={{ height: '48vh', overflowX: 'hidden', overflowY: 'auto' }}>

                                    <div id="nav-selectedmember" className="tab-pane fade show active" role="tabpanel"
                                        aria-labelledby="nav-selectedmember-tab">
                                        <Contactaction pageload={vpageload} selectmember={selectmember} selecteduserlist={selectedmember} removemember={removemember} />
                                    </div>
                                    <div id="nav-selectedgroup" className="tab-pane fade show" role="tabpanel"
                                        aria-labelledby="nav-selectedgroup-tab">
                                        <SelectedGroups groupdata={selectegroup} pagechange={pagechange} Addgroup={Addgroup} viewexclude={viewexclude} />
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>

                </div>

            </div>

            <div className="row" style={{ marginRight: '0px' }}>
                <div className="col-md-8 col-lg-8"></div>
                <div className="col-md-2 col-lg-2"><button type="button" style={{ marginTop: '10px' }} className="btn btn-outline-danger_new btnupdate btncommon" onClick={cancelgroupclick}>Cancel </button></div>
                <div className="col-md-2 col-lg-2" ><button type="button" style={{ marginTop: '10px' }} className="btn btn-outline-danger_new btnupdate btncommon" onClick={Savegroupdetails} >Submit</button></div>
            </div>
            <div className="row" style={{ float: 'right', marginRight: '0px' }}>&nbsp;</div>

            <Modal
                open={isOpen}
                onClose={hideModal}
                animationDuration={500}
                closeOnOverlayClick={false}
                showCloseIcon={false}
                blockScroll={false}
                focusTrapped={true}
                classNames={{
                    overlay: "customOverlay",
                    modal: "viewmembers",
                }}
                center
            >
                <div className="modalbody">
                    <Excludegroupmembers groupinfo={currentdata} Addexcludemember={Addexcludemember} />
                </div>
                <div className="row" style={{ width: "100%", padding: "1rem" }}>
                    <div className="col-md-2"></div>
                    <div className="col-md-10 modalfooter">
                        <button
                            type="button"
                            className="btn btn-outline-danger_new btnupdate btncommon modalcancelbtn"
                            onClick={hideModal}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-danger_new btnupdate btncommon modalproceedbtn"
                            onClick={hideModal}
                        >
                            Done
                        </button>
                        <br />
                    </div>
                </div>

            </Modal>

            <Modal
                open={isexOpen}
                onClose={hideEXModal}
                animationDuration={500}
                closeOnOverlayClick={false}
                showCloseIcon={false}
                blockScroll={false}
                focusTrapped={true}
                classNames={{
                    overlay: "customOverlay",
                    modal: "viewmembers",
                }}
                center
            >
                <div className="modalbody">
                    <Excludegroupmembers groupinfo={exgroupinfo} excludeinfo={excludeinfo} removeexcludemember={removeexcludemember} />
                </div>
                <div className="row" style={{ width: "100%", padding: "1rem" }}>
                    <div className="col-md-2"></div>
                    <div className="col-md-10 modalfooter">
                        <button
                            type="button"
                            className="btn btn-outline-danger_new btnupdate btncommon modalcancelbtn"
                            onClick={hideEXModal}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-danger_new btnupdate btncommon modalproceedbtn"
                            onClick={hideEXModal}
                        >
                            Done
                        </button>
                        <br />
                    </div>
                </div>

            </Modal>

        </div>
    );

}
const mapStateToProps = state => ({
    state: state,
});
const mapDispatchToProps = (dispatch) => {
    return {
        savegroup: data => dispatch(creategroup(data)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Creategoup);
