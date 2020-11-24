import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profile";

const Education = ({ education, deleteEducation }) => {
  if (education && education.length !== 0) {
    return (
      <div>
        <h2 className="my-2">Education Credentials</h2>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th class="hide-sm">Degree</th>
              <th class="hide-sm">Years</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {education.reverse().map((edu, index) => {
              return (
                <tr key={index}>
                  <td>{edu.school}</td>
                  <td className="hide-sm">{edu.degree}</td>
                  <td className="hide-sm">
                    <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
                    {edu.to ? (
                      <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                    ) : (
                      "Now"
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteEducation(edu._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <></>;
  }
};
function mapStateToProps(state) {
  return {
    education: state.profile.profile.education,
  };
}
export default connect(mapStateToProps, { deleteEducation })(Education);
