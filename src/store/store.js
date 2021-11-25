import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

const middleWares = [thunk];

export const store = createStore(rootReducer, applyMiddleware(...middleWares));
export const persistor = persistStore(store);

export default { store, persistor };
