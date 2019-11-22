import React from "react";
import { Link } from "react-router-dom";
import defaultAvatar from "../img/avatar.jpg";
import defaultPhoto from "../img/post.jpg";

class ProfileTabs extends React.Component {
  renderFollowers = () => {
    const { followers } = this.props;
    return (
      <div className="col-md-4">
        <h3 className="text-primary">followers</h3>
        <hr />
        {followers.map(user => (
          <div key={user._id}>
            <Link to={`/${user._id}`}>
              <img
                style={{ borderRadius: "50%", border: "1px solid grey" }}
                className="float left mr-2"
                height="50px"
                width="50px"
                src={`${process.env.REACT_APP_API_URL}/users/${user._id}/avatar`}
                onError={img => (img.target.src = `${defaultAvatar}`)}
                alt={user.name}
              />
              <div>
                <p className="lead">{user.name}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  renderFollowings = () => {
    const { followings } = this.props;
    return (
      <div className="col-md-4">
        <h3 className="text-primary">followings</h3>
        <hr />
        {followings.map(user => (
          <div key={user._id}>
            <Link to={`/${user._id}`}>
              <img
                style={{ borderRadius: "50%", border: "1px solid grey" }}
                className="float left-mr-2"
                height="50px"
                width="50px"
                src={`${process.env.REACT_APP_API_URL}/users/${user._id}/avatar`}
                onError={img => (img.target.src = `${defaultAvatar}`)}
                alt={user.name}
              />
              <div>
                <p className="lead">{user.name}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  renderPostTitle = title => {
    const words = title.split(" ");
    if (words.length <= 4) return title;
    else {
      let res = "";
      for (let i = 0; i < 4; i++) {
        res += words[i];
        res += " ";
      }
      return res + " ...";
    }
  };

  renderPosts = () => {
    const { posts } = this.props;
    return (
      <div className="col-md-4">
        <h3 className="text-primary">Posts</h3>
        <hr />
        {posts.map(post => (
          <div key={post._id}>
            <Link to={`/post/${post._id}`}>
              <img
                style={{ borderRadius: "50%", border: "1px solid grey" }}
                className="float left-mr-2"
                height="50px"
                width="50px"
                src={`${process.env.REACT_APP_API_URL}/posts/photo/${post._id}`}
                onError={img => (img.target.src = `${defaultPhoto}`)}
                alt={post.name}
              />
              <div>
                <p className="lead">{this.renderPostTitle(post.title)}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  };

  render() {
    return (
      <div>
        <div className="row">
          {this.renderFollowers()}
          {this.renderFollowings()}
          {this.renderPosts()}
        </div>
      </div>
    );
  }
}

export default ProfileTabs;
