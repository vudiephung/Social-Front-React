import React from "react";
import { Redirect } from "react-router-dom";
import { authenticate, signin } from "../auth";

class Signin extends React.Component {
  state = {
    email: "",
    password: "",
    error: "",
    redirectToReferer: false,
    loading: false
  };

  onInputChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  onClickSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    //send to back-end
    const { email, password } = this.state;
    const userObj = { email, password };
    signin(userObj).then(data => {
      if (data.error) this.setState({ error: data.error, loading: false });
      else {
        authenticate(data, () => {
          this.setState({ redirectToReferer: true });
        });
      }
    });
  };

  // renderLoading = () => {
  //   if (this.state.loading === true) {
  //     return (
  //       <div className="jumbotron text-center">
  //         <h2>Loading...</h2>
  //       </div>
  //     );
  //   }
  //   return "";
  // };

  render() {
    if (this.state.redirectToReferer) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Sign In</h2>

        <div
          className="alert alert-danger"
          style={{ display: this.state.error ? "" : "none" }}
        >
          {this.state.error}
        </div>

        {/* {this.renderLoading()} */}

        <form>
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

          <button
            onClick={this.onClickSubmit}
            className={`ui ${
              this.state.loading ? "disabled loading" : ""
            } teal button`}
          >
            Sign In
          </button>
        </form>
      </div>
    );
  }
}

export default Signin;
