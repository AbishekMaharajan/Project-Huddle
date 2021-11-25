import * as constants from "../constants/config";

export const getupcomingcalls = (req) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetch(constants.GETUPCOMINGCALLS_URI, {
      method: constants.HTTP_POST,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          return response.json();
        } else {
          reject("Something went wrong..Please try again later");
        }
      })
      .then((res) => {
        dispatch({ type: "upcomingcalls", payload: res });
        resolve(res);
      })
      .catch((error) => reject(error));
  });
};

export const getrecentconferences = (req) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetch(constants.GETRECENTCONFERENCES_URI, {
      method: constants.HTTP_POST,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          return response.json();
        } else {
          reject("Something went wrong..Please try again later");
        }
      })
      .then((res) => {
        dispatch({ type: "recentcalls", payload: res });
        resolve(res);
      })
      .catch((error) => reject(error));
  });
};

///////////////////////////////////////////////
export const getManageDlList = (req) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetch(constants.MANAGEDLLIST_URI, {
      method: constants.HTTP_POST,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          return response.json();
        } else {
          reject("Something went wrong..Please try again later");
        }
      })
      .then((res) => {
        dispatch({ type: "manageDlList", payload: res });
        resolve(res);
      })
      .catch((error) => reject(error));
  });
};
