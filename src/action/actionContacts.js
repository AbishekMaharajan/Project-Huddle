import *  as constants from "../constants/config";

export const getallcontacts = req => dispatch => {

  dispatch({ type: "progressbar", progressbar: true, });
  return new Promise((resolve, reject) => {

    fetch(constants.GETALLCONTACTS_URI, {
      method: constants.HTTP_POST,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req)
    })
      .then(response => {

        if (response.status === 200 || response.status === 201) {
          return response.json();
        }
        else {
          reject("Something went wrong..Please try again later")
        }
      })
      .then(res => {

        dispatch({ type: "allcontacts", payload: res, });
        dispatch({ type: "progressbar", progressbar: false, });

        resolve(res)

      })
      .catch((error) => reject(error))
  });

}


export const getfavcontacts = req => dispatch => {

  dispatch({ type: "progressbar", progressbar: true, });
  return new Promise((resolve, reject) => {

    fetch(constants.GETFAVOURITECONTACTS_URI, {
      method: constants.HTTP_POST,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req)
    })
      .then(response => {

        if (response.status === 200 || response.status === 201) {
          return response.json();
        }
        else {
          reject("Something went wrong..Please try again later")
        }
      })
      .then(res => {

        dispatch({ type: "favcontacts", payload: res, });
        dispatch({ type: "progressbar", progressbar: false, });

        resolve(res)

      })
      .catch((error) => reject(error))
  });

}

export const getallgroups = req => dispatch => {


  dispatch({
    type: "progressbar",
    progressbar: true,
  });
  return new Promise((resolve, reject) => {

    fetch(constants.GETALLGROUPS_URI, {
      method: constants.HTTP_POST,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req)
    })
      .then(response => {

        if (response.status === 200 || response.status === 201) {

          return response.json();
        }
        else {
          reject("Something went wrong..Please try again later")
        }
      })
      .then(res => {
        //console.log("response:all:", JSON.stringify(res))
        dispatch({
          type: "allgroups",
          payload: res,
          search: req.search,
        });
        dispatch({
          type: "progressbar",
          progressbar: false,
        });

        resolve(res)

      })
      .catch((error) => reject(error))
  });

}

export const getfavouritegroupandcontacts = req => dispatch => {

  dispatch({
    type: "progressbar",
    progressbar: true,
  });
  return new Promise((resolve, reject) => {

    console.log("request:fav:", JSON.stringify(req))

    fetch(constants.GETFAVOURITEGROUPANDCONTACTS_URI, {
      method: constants.HTTP_POST,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req)
    })
      .then(response => {

        if (response.status === 200 || response.status === 201) {
          //console.log("response", JSON.stringify(response))
          return response.json();
        }
        else {
          reject("Something went wrong..Please try again later")
        }
      })
      .then(res => {

        dispatch({
          type: "favouitegroups",
          payload: res,
          search: req.search,
        });

        dispatch({
          type: "progressbar",
          progressbar: false,
        });

        resolve(res)

      })
      .catch((error) => reject(error))
  });

}

export const getmygroups = req => dispatch => {

  dispatch({
    type: "progressbar",
    progressbar: true,
  });
  //console.log("req:all my:", JSON.stringify(req))
  return new Promise((resolve, reject) => {

    fetch(constants.GETMYGROUPS_URI, {
      method: constants.HTTP_POST,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req)
    })
      .then(response => {

        if (response.status === 200 || response.status === 201) {

          return response.json();
        }
        else {
          reject("Something went wrong..Please try again later")
        }
      })
      .then(res => {
        //console.log("response:all my:", JSON.stringify(res))
        dispatch({
          type: "allgroups",
          payload: res,
          search: req.search,
        });
        dispatch({
          type: "progressbar",
          progressbar: false,
        });

        resolve(res)

      })
      .catch((error) => reject(error))
  });

}

export const geteditgroup = req => dispatch => {

  dispatch({
    type: "progressbar",
    progressbar: true,
  });

  return new Promise((resolve, reject) => {
    fetch(constants.GETEDITGROUP_URI, {
      method: constants.HTTP_POST,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req)
    }).then(response => {

      if (response.status === 200 || response.status === 201) {

        return response.json();
      }
      else {
        reject("Something went wrong..Please try again later")
      }
    }).then(res => {
      //console.log("response:all my:", JSON.stringify(res))
      dispatch({
        type: "editgroup",
        payload: res,
        search:req.search,        
        reqmsg:req,
      });
      dispatch({
        type: "progressbar",
        progressbar: false,
      });

      resolve(res)

    })
      .catch((error) => reject(error))
  });
}


export const creategroup = req => dispatch => {
 
  return new Promise((resolve, reject) => {
    fetch(constants.CREATEGROUP_URI, {
      method: constants.HTTP_POST,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req)
    }).then(response => {

      if (response.status === 200 || response.status === 201) {

        return response.json();
      }
      else {
        reject("Something went wrong..Please try again later")
      }
    }).then(res => {
    
      resolve(res)

    })
      .catch((error) => reject(error))
  });
}