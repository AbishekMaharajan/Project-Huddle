import { act } from "react-dom/test-utils";


let loginDefault = {
  login: {},
  currentuniqueid: "",
  roleid: 0,
  Inbound: 0,
  calllimit: 0,
  feedbackflag: 0,
  flist: [
    {
      ConfDate: "",
      ConfId: "",
      ConfTime: "",
      ConfType: "",
    },
  ],
  message: "Not Logged In",
  mobile: 0,
  mycontacts: 0,
  role: [
    {
      roleid: "0",
      userid: "0",
    },
  ],
  show: 0,
  showvideo: 0,
  status: "-1",
  userName: "",
  // };

  // let favContactDefault = {
  //message: "",
  nextpage: 0,
  pagenumber: 0,
  resultset: [
    {
      country: "",
      countryid: 0,
      designation: "",
      favourite: 0,
      grouptype: 0,
      picture: "",
      showedit: 0,
      totalmembers: 0,
      userid: "0",
      usermobile: "",
      username: "",
      usertype: 0,
      workplace: "",
    },
  ],
  // status: 0,
  totalrows: 0,
};



const istudiovoiceReducer = (state = loginDefault, action) => {

  switch (action.type) {
    case "VALIDATE_LOGIN":
      return {
        ...state,
        login: action.payload,
        isLoggedin: "Y",
        currentuniqueid: action.payload.data.role[0].userid,
        roleid: action.payload.data.role[0].roleid,
      }
    case "VALIDATE_LOGIN1":
      return {
        ...state,
        Inbound: action.payload.Inbound,
        calllimit: action.payload.calllimit,
        feedbackflag: action.payload.feedbackflag,
        flist: action.payload.flist,
        message: action.payload.message,
        mobile: action.payload.mobile,
        mycontacts: action.payload.mycontacts,
        role: action.payload.role,
        show: action.payload.show,
        showvideo: action.payload.showvideo,
        status: action.payload.status,
        isLoggedin: "Y",
        userName: action.payload.userName,
      };
    case "LOG_OUT":
      return {
        ...state,
        Inbound: action.Inbound,
        calllimit: action.calllimit,
        feedbackflag: action.feedbackflag,
        flist: action.flist,
        message: action.message,
        mobile: action.mobile,
        mycontacts: action.mycontacts,
        role: action.role,
        show: action.show,
        showvideo: action.showvideo,
        status: action.status,
        isLoggedin: "N",
        userName: "",
      };
    case "COMPLETED_CONFERENCE":
      return {
        ...state,
        // confid: action.confid,
        // calleddate: action.calleddate,
        // duration: action.duration,
        // confmembers: action.confmembers,
        completedconference: action.completedconference,
        //   .map((el) =>
        //   el.id === action.id
        //     ? { ...el, orderedNum: el.orderedNum + action.value }
        //     : el
        // ),
      };
    case "FAVOURITE_CONTACTS_INFO":
      return {
        ...state,
        message: action.message,
        nextpage: action.nextpage,
        pagenumber: action.pagenumber,
        resultset: action.resultset,
        status: action.status,
        totalrows: action.totalrows,
      };
    default:
      return state;
  }
};

export default istudiovoiceReducer;

