import { useState, useEffect } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import { BsXCircle, BsChevronExpand } from "react-icons/bs";
import "../stylesheets/manageDls.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { getManageDlList } from "../action/actionHome";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
////////////////////////////////////////////

function Managedls({ loadManageDLs, state }) {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [visibility, setVisibility] = useState(false);
  useEffect(() => {
    loadgrid();
  }, []);
  const loadgrid = () => {
    setVisibility(true);
    loadManageDLs({
      empid: localStorage.getItem("userID"),
      searchadgroup: "voicesnap",
    })
      .then((res) => {
        setVisibility(false);
      })
      .catch((errmsg) => {
        console.log(errmsg);
        setVisibility(false);
      });
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="loaderdiv">
        <Loader
          type="Rings"
          color="rgb(232, 135, 59)"
          height={100}
          width={100}
          visible={visibility}
        />
      </div>
      <div className="manageDls" id="content">
        <div className="manageDls-tittle-component">
          <h4 className="manageDls-tittle">Manage DLs</h4>
          <button
            type="button"
            className="btn btn-outline-danger_new btnupdate btncommon"
            onClick={onOpenModal}
          >
            Add DLs
          </button>
        </div>

        <div className="distributed-list">
          <h6 className="list-tittle">Distributed list</h6>
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search DLs"
            aria-label="Search"
            id="txtsearch"
            style={{ width: "222px" }}
          />
        </div>
        <div className="table-responsive" style={{ width: "99%" }}>
          <table className="table" cellSpacing="0">
            <thead id="table-header" className="table-head">
              <tr className="rowstyle">
                <th className="gridheader">Group name</th>
                <th className="gridheader">
                  Created date <BsChevronExpand size="1.2rem" />
                </th>
                <th className="gridheader text-center">Remove</th>
              </tr>
            </thead>
            <tbody>
              {state.common.managedlinfo.data.resultset.map((info) => (
                <tr className="rowstyle" key={info.groupNameId}>
                  <td className="gridrow">{info.groupName}</td>
                  <td className="gridrow">{info.CreatedDay}</td>
                  <td className="gridrow text-center">
                    <BsXCircle size="1.25rem" color="red" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      /////////////////////////
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        // classNames="modal-content"
        classNames={{
          overlay: "customOverlay",
          modal: "modal-content",
        }}
      >
        <div className="model-main d-flex">
          <div className="model-table-1">
            <div className="modal-tittle">
              <h6 className="modal-table-tittle">DL groups</h6>
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Groups"
                aria-label="Search"
                id="txtsearch"
                style={{ width: "222px" }}
              />
            </div>
            <table className="table" cellSpacing="0">
              <thead id="table-header" className="table-head">
                <tr className="rowstyle">
                  <th className="gridheader">Group name</th>
                  <th className="gridheader">NOs</th>
                  <th className="gridheader text-center">Select</th>
                </tr>
              </thead>
              <tbody>
                <tr className="rowstyle">
                  <td className="gridrow">Group 1</td>
                  <td className="gridrow">350</td>
                  <td className="gridrow text-center">
                    <button
                      type="button"
                      className="btn btn-outline-danger_new btnupdate btn-select"
                    >
                      Select
                    </button>
                  </td>
                </tr>
                <tr className="rowstyle">
                  <td className="gridrow">Group 2</td>
                  <td className="gridrow">450</td>
                  <td className="gridrow text-center">
                    <button
                      type="button"
                      className="btn btn-outline-danger_new btnupdate btn-select"
                      onClick={onOpenModal}
                    >
                      Select
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="model-table-2">
            <div className="modal-tittle">
              <h6 className="modal-table-tittle">Selected groups</h6>
              <input
                className="form-control mr-sm-2 txtsearch1"
                type="search"
                placeholder=""
                aria-label="Search"
                id="txtsearch1"
                disabled="true"
              ></input>
            </div>
            <table className="table" cellSpacing="0">
              <thead id="table-header" className="table-head">
                <tr className="rowstyle">
                  <th className="gridheader">Group name</th>
                  <th className="gridheader">NOs</th>
                  <th className="gridheader text-center">Remove</th>
                </tr>
              </thead>
              <tbody>
                <tr className="rowstyle">
                  <td className="gridrow">Group 1</td>
                  <td className="gridrow">100</td>
                  <td className="gridrow text-center">
                    <BsXCircle size="1.25rem" color="red" />
                  </td>
                </tr>
                <tr className="rowstyle">
                  <td className="gridrow">Group 2</td>
                  <td className="gridrow">200</td>
                  <td className="gridrow text-center">
                    <BsXCircle size="1.25rem" color="red" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-outline-danger_new btnupdate btncommon"
            onClick={onCloseModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-outline-danger_new btnupdate btncommon"
          >
            Add selected DL
          </button>
        </div>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state) => ({
  state: state,
});
const mapDispatchToProps = (dispatch) => ({
  loadManageDLs: (data) => dispatch(getManageDlList(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Managedls);
