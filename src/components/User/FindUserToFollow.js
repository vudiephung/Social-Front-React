import React from "react";
import { findUserToFollow } from "./apiUser";
import defaultAvatar from "../img/avatar.jpg";
import { Link } from "react-router-dom";
import { follow } from "./apiUser";

class FindUserToFollow extends React.Component {
  state = { users: [], message: "", following: false };

  async componentDidMount() {
    const data = await findUserToFollow();
    if (data.error) console.log(data.error);
    this.setState({ users: data });
  }

  renderImg = user => {
    const avatarURL = user._id
      ? `${process.env.REACT_APP_API_URL}/users/${user._id}/avatar`
      : defaultAvatar;
    return (
      <img
        src={avatarURL}
        alt={user.name}
        className="card-img-top mt-3"
        alt={user.name}
        onError={i => (i.target.src = `${defaultAvatar}`)}
        style={{ width: "100%", height: "25vh", objectFit: "cover" }}
      />
    );
  };

  clickFollow = async user => {
    const res = await follow(user._id);
    if (res.error) this.setState({ message: res.error });
    else this.setState({ following: true, message: `Following ${user.name}` });
  };

  renderUsers = () => {
    const { users } = this.state;
    return (
      <div className="row">
        {users.map((user, id) => (
          <div
            className="card col-md-3 ml-5 mt-5"
            style={{ width: "18rem" }}
            key={id}
          >
            {this.renderImg(user)}
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text">{user.email}</p>
              <Link to={`/${user._id}`} className="btn btn-raised btn-primary">
                View Profile
              </Link>
              <button
                onClick={() => {
                  this.clickFollow(user);
                }}
                className="btn btn-raised btn-info float-right"
              >
                Follow
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  render() {
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Follow More Users</h2>
        <div>
          {this.state.following && (
            <div className="alert alert-success">{this.state.message}</div>
          )}
        </div>
        {this.renderUsers()}
      </div>
    );
  }
}

export default FindUserToFollow;
