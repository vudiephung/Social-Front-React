import React from "react";
import { Redirect } from "react-router-dom";
import { remove } from "./apiPost";
class DeletePost extends React.Component {
  state = { reDirectToHome: false };
  deletePost = async () => {
    await remove(this.props.post._id);
    this.setState({ reDirectToHome: true });
    //this.props.history.push("/");
  };
  confirmDelete = () => {
    let answer = window.confirm("Are you sure you want to delete this post?");
    if (answer) this.deletePost();
  };
  render() {
    if (this.state.reDirectToHome) return <Redirect to="/" />;
    return (
      <>
        <button
          onClick={this.confirmDelete}
          className="btn btn-raised btn-danger card-link"
        >
          Delete
        </button>
      </>
    );
  }
}
export default DeletePost;

{
  /*  */
}
