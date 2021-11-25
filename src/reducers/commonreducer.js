import * as constants from "../constants/config";

var commondefault = {
  currentuniqueid: "",
  upcomingcalls: { data: { resultset: [], nextpage: 0 } },
  recentcalls: { data: { resultset: [], nextpage: 0 } },
  manageDlInfo: { data: { resultset: [], nextpage: 0 } },
  search: "",
  pagecount: 1,
};

const commonReducer = (state = commondefault, action) => {
  switch (action.type) {
    case "recentcalls":
      return {
        ...state,
        recentcalls: action.payload,
      };
    case "upcomingcalls":
      return {
        ...state,
        upcomingcalls: action.payload,
      };
    case "manageDlList":
      return {
        ...state,
        manageDlInfo: action.payload,
      };
    default:
      return state;
  }
};

export default commonReducer;
