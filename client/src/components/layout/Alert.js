import React from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";

const Alert = ({ alert }) =>
  alert !== null &&
  alert.length > 0 &&
  alert.map((alert) => (
    <div className={`alert alert-${alert.alertType}`} key={alert.id}>
      {alert.msg}
    </div>
  ));

export default connect((state) => state)(Alert);
