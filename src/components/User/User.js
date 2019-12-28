import React from "react";
import { listAllUsers } from "./apiUser";
import defaultAvatar from "../img/avatar.jpg";
import { Link } from "react-router-dom";
import moment from "moment";

class User extends React.Component {
  state = { users: [] };

  componentDidMount() {
    listAllUsers().then(data => {
      if (data.error) console.log(data.error);
      else this.setState({ users: data });
    });
  }

  renderImg = user => {
    const avatarURL = user.avatar ? user.avatar : defaultAvatar;
    return <img src={avatarURL} alt={user.name} />;
  };

  renderUsers = () => {
    const { users } = this.state;
    // return (
    //   <div className="row">
    //     {users.map((user, id) => (
    //       <div
    //         className="card col-md-3 ml-5 mt-5"
    //         style={{ width: "18rem" }}
    //         key={id}
    //       >
    //         {this.renderImg(user)}
    //         <div className="card-body">
    //           <h5 className="card-title">{user.name}</h5>
    //           <p className="card-text">{user.email}</p>
    //           <Link to={`/${user._id}`} className="btn btn-raised btn-primary">
    //             View Profile
    //           </Link>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // );
    return (
      <div className="ui special cards">
        {users.map((user, id) => (
          <Link
            to={`/${user._id}`}
            className="ui red card"
            style={{ width: "19rem" }}
            key={id}
          >
            <div className="image">{this.renderImg(user)}</div>
            <div className="content">
              <Link to={`/${user._id}`} className="header">
                {user.name}
              </Link>
              <div className="meta">
                <span className="date">
                  Joined at {moment(user.createdAt).calendar()}
                </span>
              </div>
              <div className="description">{user.about}</div>
            </div>
            <div className="extra content">
              <i className="users icon"></i>
              {`${user.followers.length}`} Followers
            </div>
          </Link>
        ))}
      </div>
    );
  };

  render() {
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Users</h2>
        {this.renderUsers()}
      </div>
    );
  }
}

export default User;
