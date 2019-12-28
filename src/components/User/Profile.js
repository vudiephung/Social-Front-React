import React from "react";
import { isAuthenticated } from "../auth";
import moment from "moment";
import { Redirect, Link } from "react-router-dom";
import { fetchUserById, getFollowStatus, getAllPostsByUser } from "./apiUser";
import defaultAvatar from "../img/avatar.jpg";
import DeleteUser from "./DeleteUser";
import FollowButton from "./FollowButton";
import ProfileTabs from "./ProfileTabs";

class Profile extends React.Component {
  state = {
    user: "",
    reDirectToLogin: false,
    isFollowThisUser: false,
    followings: [],
    followers: [],
    avatar: "",
    posts: [],
    error: ""
  };

  onFollowClick = async callAPI => {
    const response = await callAPI(this.state.user._id);
    //console.log(response);
    if (response.error) return this.setState({ error: response.error });
    this.setState({
      followers: response.thisUserIsFollowedBy,
      isFollowThisUser: true
    });
  };

  onUnfollowClick = async callAPI => {
    const response = await callAPI(this.state.user._id);
    console.log(response);
    if (response.error) return this.setState({ error: response.error });
    else
      this.setState({
        followers: response.thisUserIsFollowedBy,
        isFollowThisUser: false
      });
  };

  async componentDidMount() {
    this.fetchUserAndFollowStatus();
  }

  componentWillReceiveProps(props) {
    // use when props is changed
    fetchUserById(props.match.params.userId).then(data => {
      if (data.error) this.setState({ reDirectToLogin: true });
      else this.setState({ user: data });
    });
  }

  fetchUserAndFollowStatus = async () => {
    const thisUserId = this.props.match.params.userId;
    const thisUserProfile = await fetchUserById(thisUserId);
    if (thisUserProfile.error) return this.setState({ reDirectToLogin: true });

    // Don't: const loginUser = isAuthenticated().user
    // Since: This this data is fetched from localStorage, which  at that time do not have data about followings and follower
    const loginUserId = isAuthenticated().user._id;
    const loginUser = await fetchUserById(loginUserId);

    const match = loginUser.followings.find(following => {
      return following === thisUserId;
    });

    const followStatus = await getFollowStatus(thisUserId);

    const postsByThisUser = await getAllPostsByUser(thisUserId);

    if (match)
      this.setState({
        user: thisUserProfile,
        isFollowThisUser: true,
        followings: followStatus.thisUserFollowing,
        followers: followStatus.thisUserIsFollowedBy,
        posts: postsByThisUser
      });
    else
      this.setState({
        user: thisUserProfile,
        isFollowThisUser: false,
        followings: followStatus.thisUserFollowing,
        followers: followStatus.thisUserIsFollowedBy,
        posts: postsByThisUser
      });
  };

  renderImg = () => {
    const photoUrl = this.state.user.avatar
      ? this.state.user.avatar
      : defaultAvatar;
    return (
      <img
        src={photoUrl}
        onError={img => (img.target.src = `${defaultAvatar}`)}
        alt={this.state.user.name}
        className="ui left floated image circular avatar"
        alt={this.state.user.name}
        style={{
          width: "auto",
          height: "40vw",
          objectFit: "cover",
          marginTop: "2em"
        }}
      />
    );
  };

  render() {
    if (this.state.reDirectToLogin) return <Redirect to="/" />;

    const { name, email } = this.state.user;
    return (
      <div className="container">
        {!this.state.user.name ? (
          <div className="ui active dimmer">
            <div className="ui huge text loader">Fetching User ...</div>
          </div>
        ) : (
          <div className="row">
            {this.renderImg()}
            <div className="col-md-6 lead">
              <h2 className="mt-5 mb-5">Profile</h2>
              <p>
                Hello <strong>{name}</strong>
              </p>
              <p>
                Email: <strong>{email}</strong>
              </p>
              <div>
                Joined at:
                <span>
                  <strong>
                    {` ${moment(this.state.user.createdAt).format(
                      "MMM Do YYYY"
                    )}`}
                  </strong>
                </span>
              </div>

              {isAuthenticated() &&
              isAuthenticated().user._id === this.state.user._id ? (
                <div className="d-inline-block mt-4">
                  <Link
                    className="btn btn-raised btn-success mr-5"
                    to={`/users/edit/${this.state.user._id}`}
                  >
                    Edit Profile
                  </Link>

                  <DeleteUser user={this.state.user} />
                </div>
              ) : (
                <FollowButton
                  following={this.state.isFollowThisUser}
                  onFollowClick={this.onFollowClick}
                  onUnfollowClick={this.onUnfollowClick}
                />
              )}
            </div>

            <div className="row">
              <div className="col-md-12">
                <hr />
                <p className="lead">{this.state.user.about}</p>

                <ProfileTabs
                  followers={this.state.followers}
                  followings={this.state.followings}
                  posts={this.state.posts}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
