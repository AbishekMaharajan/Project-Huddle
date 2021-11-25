import *  as constants from "../constants/config";

var contactsdefault = {
  currentuniqueid: '',
  contact: { data: { resultset: [], nextpage: 0 } },
  groups: { data: { resultset: [], nextpage: 0 } },
  progressbar: false,
  search: '',
  pagecount: 1,
  selectedtab: 'fav',
  editgroup: { data: { resultset: [], nextpage: 0, groupcode: 0, groupname: "" } },
  pageresultset: [],
  newgroup: { selectedcontacts: [], selectedgroups: [], exculdedcontacts: [] }
};

const contactReducer = (state = contactsdefault, action) => {

  switch (action.type) {
    case "allcontacts":

      var checkedstate = new Array(action.payload.data.resultset.length).fill(false)

      for (let i = 0; i < state.newgroup.selectedcontacts.length; i++) {
        for (let j = 0; j < action.payload.data.resultset.length; j++) {

          if (state.newgroup.selectedcontacts[i].userid === action.payload.data.resultset[j].userid) {

            const updatedstate = checkedstate.map((item, index) =>
              index === j ? true : item
            );
            checkedstate = updatedstate;

          }
        }
      }

      return {
        ...state,
        contact: action.payload,
        checkedstate: checkedstate
      }
    case "allgroups":

      var groupcheckedstate = new Array(action.payload.data.resultset.length).fill(false)

      for (let i = 0; i < state.newgroup.selectedgroups.length; i++) {
        for (let j = 0; j < action.payload.data.resultset.length; j++) {

          if (state.newgroup.selectedgroups[i].userid === action.payload.data.resultset[j].userid) {

            const updatedstate = groupcheckedstate.map((item, index) =>
              index === j ? true : item
            );
            groupcheckedstate = updatedstate;

          }
        }
      }

      return {
        ...state,
        groupslist: action.payload,
        allgroupslist: action.payload,
        search: action.search,
        pagecount: Math.ceil(action.payload.data.totalrows / constants.PAGE_SIZE),
        groupcheckedstate: groupcheckedstate
      }
    case "progressbar":
      return {
        ...state,
        progressbar: action.progressbar,
      }
    case "favouitegroups":
      return {
        ...state,
        // groups:action.payload,
        search: action.search,
        pagecount: Math.ceil(action.payload.data.totalrows / constants.PAGE_SIZE)
      }
    case "editgroup":
      var excludemembersstate = new Array(action.payload.data.resultset.length).fill(false);     

      for (let i = 0; i < state.newgroup.exculdedcontacts.length; i++) {
        for (let j = 0; j < action.payload.data.resultset.length; j++) {

          if (state.newgroup.exculdedcontacts[i].userid === action.payload.data.resultset[j].userid &&
            action.reqmsg.groupcode === state.newgroup.exculdedcontacts[i].groupcode) {

            const updatedstate = excludemembersstate.map((item, index) =>
              index === j ? true : item
            );
            excludemembersstate = updatedstate;
          }
        }
      }
      return {
        ...state,
        editgroup: action.payload,
        search: action.search,
        pagecount: Math.ceil(action.payload.data.totalrows / constants.PAGE_SIZE),
        excludemembersstate: excludemembersstate
      }
    case "favcontacts":
      var favcheckedstate = new Array(action.payload.data.resultset.length).fill(false);
      for (let i = 0; i < state.newgroup.selectedcontacts.length; i++) {
        for (let j = 0; j < action.payload.data.resultset.length; j++) {

          if (state.newgroup.selectedcontacts[i].userid === action.payload.data.resultset[j].userid) {

            const updatedstate = favcheckedstate.map((item, index) =>
              index === j ? true : item
            );
            favcheckedstate = updatedstate;
          }
        }
      }
      return {
        ...state,
        favcontact: action.payload,
        favcheckedstate: favcheckedstate
      }

    default:
      return state;
  };
}
export default contactReducer;