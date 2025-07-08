import { combineReducers } from "redux";
import adminReducres from "./Reducer";

const rootReducer = combineReducers({
  data: adminReducres,
});

export default rootReducer;
