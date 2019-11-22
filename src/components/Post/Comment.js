import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { comment } from "./apiPost";
import defaultAvatar from "../img/avatar.jpg";

class Comment extends React.Component {
  state = { value: "", error: "" };
  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { value } = this.state;
    const length = value.length;
    if (length > 150)
      return this.setState({
        error: "Your comment should maximum 150 characters long!"
      });
    this.setState({ error: "" });
    document.querySelector("textarea").value = "";
    this.addComment(value);
  };

  addComment = async value => {
    const postId = this.props.post._id;
    const commentObj = {
      text: value
    };
    const response = await comment(postId, commentObj);
    //console.log(response);
    const { comments } = response;
    this.props.updateComment(comments);
  };

  renderComments = () => {
    const { comments } = this.props;
    return (
      <div>
        <h3 className="text-primary">{comments.length} Comments</h3>
        <hr />
        {comments.map((comment, i) => {
          const user = comment.postedBy;
          return (
            <div className="comment">
              <Link to={`/${user._id}`} className="avatar">
                <img
                  src={`${process.env.REACT_APP_API_URL}/users/${user._id}/avatar`}
                  onError={img => (img.target.src = `${defaultAvatar}`)}
                  alt={user.name}
                />
              </Link>
              <div className="content">
                <Link to={`/${user._id}`} className="author">
                  {user.name}
                </Link>
                <div className="metadata">
                  <span className="date">
                    {moment(comment.createdAt).calendar()}
                  </span>
                </div>
                <div className="text">{comment.text}</div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <div className="ui comments">
        <h3 className="ui dividing header">Comments</h3>
        <div
          className="alert alert-danger"
          style={{ display: this.state.error ? "" : "none" }}
        >
          {this.state.error}
        </div>
        <div className="append-comment"></div>
        <form className="ui reply form">
          <div className="field">
            <textarea onChange={this.handleChange}></textarea>
          </div>
          <button
            className="ui blue labeled submit icon button"
            onClick={this.handleSubmit}
            type="submit"
          >
            <i className="icon edit"></i> Comment
          </button>
        </form>

        <br />

        {this.renderComments()}
      </div>
    );
  }
}

export default Comment;
