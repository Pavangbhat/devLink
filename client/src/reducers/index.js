import alert from "./alert";
import auth from "./auth";
const { combineReducers } = require("redux");

export default combineReducers({ alert, auth });
