import axios from "axios";
import *  as constants from "../constants/config";
 
/*Login */
export function validateLogin1(params) {
  return (dispatch) => {
    return axios.post(constants.APPLOGIN_URI, params).then((response) => {
      dispatch(loginInfo(response.data.data));
    });
  };
}

export const validateLogin = req => dispatch=> {
  return new Promise((resolve, reject) => {
      console.log("request", JSON.stringify(req))
console.log(constants.APPLOGIN_URI);
      fetch(constants.APPLOGIN_URI, {
          method: "post",
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(req)
      })
          .then(response => {
              console.log("URL",response.status +"  : "+response.url)

              if (response.status == 200 || response.status == 201) {
                  return response.json();
              }
              else {
                  reject("Something went wrong..Please try again later")
              }
          })
          .then(res => {
              console.log("login_response_body :", res); // <-------- res is ok with data
              dispatch({
                type: "VALIDATE_LOGIN",
                payload: res,
              });

            resolve(res)
              /*
              if (res.data == 1) {
                   
                  dispatch({
                      type: "VALIDATE_LOGIN",
                      payload: res,
                    });

                  resolve(res)
              }
              else {
                  reject(res.message)
              }
              */
          })
          .catch((error) => reject(error))
  });
}

export function loadfavcontacts(params) {
  
  return (dispatch) => {
    return axios
      .post(constants.GETFAVOURITEGROUPANDCONTACTS_URI,params)
      .then((response) => {
        dispatch(favContactInfo(response.data.data));
      });
  };
}
export function loginInfo(userData) {
  if (userData.status === 1) {
    return {
      type: "VALIDATE_LOGIN",
      Inbound: userData.Inbound,
      calllimit: userData.calllimit,
      feedbackflag: userData.feedbackflag,
      flist: userData.flist,
      message: "success", // userData.message,
      mobile: userData.mobile,
      mycontacts: userData.mycontacts,
      role: userData.role,
      show: userData.show,
      showvideo: userData.showvideo,
      status: userData.status,
      userName: userData.username,
    };
  } else {
    return {
      type: "VALIDATE_LOGIN",
      Inbound: 0,
      calllimit: 0,
      feedbackflag: 0,
      flist: 0,
      message: userData.message,
      mobile: 0,
      mycontacts: 0,
      role: 0,
      show: 0,
      showvideo: 0,
      status: userData.status,
      userName: "",
    };
  }
}
/* End*/
/* Logout*/
export function logOut() {
  return (dispatch) => {
    let params = {
      Mobilenumber: "",
      Password: "",
    };
    return axios.post("appLogin", params).then((response) => {
      dispatch(clearlogininfo());
    });
  };
}

export function clearlogininfo() {
  return {
    type: "LOG_OUT",
    Inbound: 0,
    calllimit: 0,
    feedbackflag: 0,
    flist: 0,
    message: "SIGNED_OUT",
    mobile: 0,
    mycontacts: 0,
    role: 0,
    show: 0,
    showvideo: 0,
    status: "0",
  };
}
/* End*/

export function favContactInfo(contactData) {
  if (contactData.status === 1) {
    return {
      type: "FAVOURITE_CONTACTS_INFO",
      message: contactData.message,
      nextpage: contactData.nextpage,
      pagenumber: contactData.pagenumber,
      resultset: contactData.resultset,
      status: contactData.status,
      totalrows: contactData.totalrows,
    };
  } else {
    return {
      type: "FAVOURITE_CONTACTS_INFO",
      message: "",
      nextpage: 0,
      pagenumber: 0,
      resultset: [],
      status: 0,
      totalrows: 0,
    };
  }
}
