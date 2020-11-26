import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRepos } from "../../actions/profile";

const ProfileGithub = ({ getRepos, githubusername, profile: { repos } }) => {
  useEffect(() => {
    getRepos(githubusername);
  }, [githubusername]);

  return (
    <div class="profile-github">
      <h2 class="text-primary my-1">
        <i class="fab fa-github"></i> Github Repos
      </h2>
      {repos.length > 0 ? (
        repos.map((repo, index) => (
          <div class="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description && repo.description}</p>
            </div>
            <div>
              <ul>
                <li class="badge badge-primary">
                  Stars: {repo.stargazers_count}
                </li>
                <li class="badge badge-dark">Watchers: {repo.watchers}</li>
                <li class="badge badge-light">Forks: {repo.forks}</li>
              </ul>
            </div>
          </div>
        ))
      ) : (
        <h4>User dont have any repositories</h4>
      )}
    </div>
  );
};

export default connect((state) => state, { getRepos })(ProfileGithub);
