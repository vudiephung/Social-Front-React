import React from "react";
import { follow, unfollow } from "./apiUser";

class FollowButton extends React.Component {
  // followUser = () => {
  //   this.props.onFollowClick(follow);
  // };

  // unfollowUser = () => {
  //   this.props.onUnfollowClick(unfollow);
  // };

  render() {
    const isFollowing = this.props.following;
    return (
      <div className="d-inline-block mt-5">
        {isFollowing ? (
          <button
            className="btn btn-warning btn-raised mt-3"
            onClick={() => this.props.onUnfollowClick(unfollow)}
          >
            Unfollow
          </button>
        ) : (
          <button
            className="btn btn-success btn-raised mt-3 mr-3"
            onClick={() => this.props.onFollowClick(follow)}
          >
            Follow
          </button>
        )}
      </div>
    );
  }
}

export default FollowButton;
