import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../reducers/loginreducer";
import contactReducer from "../reducers/contactreducer";
import commonReducer from "../reducers/commonreducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userInfo", "favcontactInfo", "contacts"],
};

const rootReducer = combineReducers({
  userInfo: userReducer,
  favcontactInfo: userReducer,
  contactbooks: contactReducer,
  common: commonReducer,
});

export default persistReducer(persistConfig, rootReducer);
