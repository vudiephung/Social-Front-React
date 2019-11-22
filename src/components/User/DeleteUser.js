import React from "react";
import { withRouter } from "react-router-dom";
import { remove } from "./apiUser";
import { signOut } from "../auth";

class DeleteUser extends React.Component {
  deleteAccount = async () => {
    await remove();
    signOut(() => console.log("signout"));
    this.props.history.push("/");
  };

  confirmDelete = () => {
    let answer = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (answer) this.deleteAccount();
  };

  render() {
    return (
      <>
        <button
          onClick={this.confirmDelete}
          className="btn btn-raised btn-danger"
          to="/"
        >
          Delete Profile
        </button>
      </>
    );
  }
}

export default withRouter(DeleteUser);
