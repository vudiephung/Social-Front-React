import React from "react";
import { signup } from "../auth";
import { Link } from "react-router-dom";

class Signup extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
    open: false,
    loading: false
  };

  onInputChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  onClickSubmit = e => {
    e.preventDefault();
    //send to back-end
    this.setState({ open: false });
    const { name, email, password, confirmPassword } = this.state;
    const userObj = { name, email, password, confirmPassword };
    this.setState({ loading: true });
    signup(userObj).then(data => {
      if (data.error) this.setState({ error: data.error });
      else
        this.setState({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          open: true,
          error: ""
        });
    });
    this.setState({ loading: false });
  };

  render() {
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Sign Up</h2>
        <div
          className="alert alert-danger"
          style={{ display: this.state.error ? "" : "none" }}
        >
          {this.state.error}
        </div>

        <div
          className="alert alert-info"
          style={{ display: this.state.open ? "" : "none" }}
        >
          A new account has been successfully created. Please{" "}
          <Link to="/signin">Sign in.</Link>
        </div>

        <form>
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              className="form-control"
              onChange={this.onInputChange("name")}
              value={this.state.name}
            ></input>
          </div>

          <div className="form-group">
            <label className="text-muted">Email</label>
            <input
              onChange={this.onInputChange("email")}
              className="form-control"
              value={this.state.email}
            ></input>
          </div>

          <div className="form-group">
            <label className="text-muted">Passowrd</label>
            <input
              type="password"
              onChange={this.onInputChange("password")}
              className="form-control"
              value={this.state.password}
            ></input>
          </div>

          <div className="form-group">
            <label className="text-muted">Confirm Password</label>
            <input
              type="password"
              onChange={this.onInputChange("confirmPassword")}
              className="form-control"
              value={this.state.confirmPassword}
            ></input>
          </div>

          <button
            onClick={this.onClickSubmit}
            className={`ui ${
              this.state.loading ? "disabled loading" : ""
            } teal button`}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Signup;
