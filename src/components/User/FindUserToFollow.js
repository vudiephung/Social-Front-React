import React from "react";
import { findUserToFollow } from "./apiUser";
import defaultAvatar from "../img/avatar.jpg";
import { Link } from "react-router-dom";
import { follow } from "./apiUser";
import moment from "moment";

class FindUserToFollow extends React.Component {
  state = { users: [], message: "", following: false };

  async componentDidMount() {
    const data = await findUserToFollow();
    if (data.error) console.log(data.error);
    this.setState({ users: data });
  }

  renderImg = user => {
    const avatarURL = user.avatar ? user.avatar : defaultAvatar;
    return (
      <img
        src={avatarURL}
        alt={user.name}
        onError={i => (i.target.src = `${defaultAvatar}`)}
      />
    );
  };

  clickFollow = async user => {
    const res = await follow(user._id);
    if (res.error) this.setState({ message: res.error });
    else this.setState({ following: true, message: `Following ${user.name}` });
  };

  // renderUsers = () => {
  //   const { users } = this.state;
  //   return (
  //     <div className="row">
  //       {users.map((user, id) => (
  //         <div
  //           className="card col-md-3 ml-5 mt-5"
  //           style={{ width: "18rem" }}
  //           key={id}
  //         >
  //           {this.renderImg(user)}
  //           <div className="card-body">
  //             <h5 className="card-title">{user.name}</h5>
  //             <p className="card-text">{user.email}</p>
  //             <Link to={`/${user._id}`} className="btn btn-raised btn-primary">
  //               View Profile
  //             </Link>
  //             <button
  //               onClick={() => {
  //                 this.clickFollow(user);
  //               }}
  //               className="btn btn-raised btn-info float-right"
  //             >
  //               Follow
  //             </button>
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };

  renderUsers = () => {
    const { users } = this.state;
    return (
      <div className="ui special cards">
        {users.map((user, id) => (
          <div className="ui green card" style={{ width: "19rem" }} key={id}>
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
            </div>

            <button
              onClick={() => {
                this.clickFollow(user);
              }}
              class="ui bottom attached button"
            >
              <i class="add icon"></i>
              Follow
            </button>
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
