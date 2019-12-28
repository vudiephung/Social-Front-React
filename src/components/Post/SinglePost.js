import React from "react";
import defaultPhoto from "../img/post.jpg";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import moment from "moment";
import DeletePost from "./DeletePost";
import { like, dislike } from "./apiPost";
import Comment from "./Comment";

class SinglePost extends React.Component {
  state = {
    post: null,
    likeStatus: undefined,
    likes: 0,
    redirectToHome: false,
    comments: []
  };

  async componentDidMount() {
    const currentUser = isAuthenticated().user;
    const { post } = this.props;
    // check whether login User like this post or not
    const match = post.likes.find(userId => {
      return userId === currentUser._id;
    });
    if (match) {
      this.setState({
        post: this.props.post,
        likes: this.props.post.likes.length,
        comments: post.comments,
        likeStatus: true
      });
    } else {
      this.setState({
        post: this.props.post,
        likes: this.props.post.likes.length,
        comments: post.comments,
        likeStatus: false
      });
    }
  }

  updateComment = comments => {
    this.setState({ comments });
  };

  renderImg = post => {
    const photoURL = post.mediaUrl ? post.mediaUrl : defaultPhoto;
    return (
      <img
        src={photoURL}
        alt={post.title}
        className="img-thumbnail mb-3 ui medium rounded image"
        onError={i => (i.target.src = `${defaultPhoto}`)}
        style={{
          height: "500px",
          width: "100%",
          objectFit: "cover"
        }}
      />
    );
  };

  likeToggle = async () => {
    const { likeStatus, post } = this.state;
    const newLikeStatus = !likeStatus;
    this.setState({ likeStatus: newLikeStatus });
    if (newLikeStatus) {
      // update database and rerender likes number
      const response = await like(post._id);
      //console.log(response);
      this.setState({ likes: response.likes.length });
    } else {
      const response = await dislike(post._id);
      //console.log(response);
      this.setState({ likes: response.likes.length });
    }
  };

  renderPost = () => {
    const { post } = this.props;
    const { owner } = this.props.post;
    const { likes, likeStatus } = this.state;
    //
    const createdAt = moment(post.createdAt).calendar();
    //
    let ownerName = owner.name;

    if (isAuthenticated()) {
      const currentUser = isAuthenticated().user;
      if (owner._id === currentUser._id) ownerName = "You";
    }

    return (
      <div className="card-body">
        {this.renderImg(post)}

        {likeStatus ? (
          <div
            onClick={this.likeToggle}
            className="ui labeled button mb-3"
            tabindex="0"
          >
            <div className="ui red button">
              <i className=" heart icon"></i> Like
            </div>
            <a className="ui basic left pointing red label">{likes}</a>
          </div>
        ) : (
          <div
            onClick={this.likeToggle}
            className="ui labeled button mb-3"
            tabindex="0"
          >
            <div className="ui button">
              <i className=" heart icon"></i> Like
            </div>
            <a className="ui basic left pointing label">{likes}</a>
          </div>
        )}

        <div className="card-text">
          <p className="card-text text-justify">{post.body}</p>

          {isAuthenticated() && isAuthenticated().user._id === owner._id ? (
            <div>
              <Link
                to={`/post/${this.props.post._id}/edit`}
                className="btn btn-raised btn-info card-link"
              >
                Update
              </Link>
              <DeletePost post={this.props.post} />
            </div>
          ) : (
            <div></div>
          )}
          <br />
          <p className="font-italic mark">
            Posted By <Link to={`/${owner._id}`}>{`${ownerName}`}</Link> on{" "}
            {createdAt}
          </p>

          <Link to={`/`} className="btn btn-raised btn-primary card-link">
            Back To Posts
          </Link>

          <br />
          <Comment
            post={this.state.post}
            comments={this.state.comments}
            updateComment={this.updateComment}
          />
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="container">
        <h3 className="display-2 mt-5 mb-5 ml-3">{this.props.post.title}</h3>
        {!this.props.post.body ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          this.renderPost()
        )}
      </div>
    );
  }
}

export default SinglePost;
