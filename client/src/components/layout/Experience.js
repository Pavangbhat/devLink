import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profile";

const Experience = ({ experience, deleteExperience }) => {
  if (experience && experience.length !== 0) {
    return (
      <div>
        <h2 className="my-2">Experience Credentials</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th className="hide-sm">Title</th>
              <th className="hide-sm">Years</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {experience.reverse().map((exp, index) => {
              return (
                <tr key={index}>
                  <td>{exp.company}</td>
                  <td className="hide-sm">{exp.title}</td>
                  <td className="hide-sm">
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
                    {exp.to ? (
                      <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                    ) : (
                      "Now"
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteExperience(exp._id);
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
    experience: state.profile.profile.experience,
  };
}
export default connect(mapStateToProps, { deleteExperience })(Experience);
