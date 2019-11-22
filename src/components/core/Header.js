import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signOut, isAuthenticated } from "../auth";

const Header = props => {
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/users">
            Users
          </Link>
        </li>

        {isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/find">
                Find User
              </Link>
            </li>
          </>
        )}

        {isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/new/post">
                Create Post
              </Link>
            </li>
          </>
        )}

        {!isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Sign Up
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="signin">
                Sign In
              </Link>
            </li>
          </>
        )}

        {isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link className="nav-link" to={`/${isAuthenticated().user._id}`}>
                {isAuthenticated().user.name}'s Profile
              </Link>
            </li>

            <li className="nav-item">
              <span
                style={{ cursor: "pointer" }}
                className="nav-link"
                onClick={() => signOut(() => props.history.push("/"))}
              >
                Sign Out
              </span>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Header);
