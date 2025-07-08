import { combineReducers } from "redux";
import userReducres from "./Reducer";

const rootReducer = combineReducers({
  data: userReducres,
});

export default rootReducer;
