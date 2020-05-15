import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import uiReducer from "./reducers/uiReducer";
import imageReducer from "./reducers/imageReducer";

const initialState = {};
const middleware = [thunk];

const reducers = combineReducers({
    uiReducer,
    imageReducer
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store;
