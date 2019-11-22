import React from "react";
import { fetchUserById, updateUser, uploadAvatar } from "./apiUser";
import { Redirect } from "react-router-dom";
import defaultAvatar from "../img/avatar.jpg";

class EditUser extends React.Component {
  state = {
    _id: "",
    name: "",
    about: "",
    error: "",
    avatar: "",
    reDirectToProfile: false,
    loading: false
  };

  renderLoading = () => {
    if (this.state.loading) {
      return (
        <div className="jumbotron text-center">
          <h2>Loading...</h2>
        </div>
      );
    }
    return "";
  };

  renderImg = () => {
    const avatarURL = `${process.env.REACT_APP_API_URL}/users/${this.state._id}/avatar`;
    //const avatarURL = `data:image/png;base64,${this.state.avatar.data}`;
    return (
      <img
        id="avatarImg"
        src={avatarURL}
        onError={img => (img.target.src = `${defaultAvatar}`)}
        alt={this.state.name}
        style={{ height: "200px", width: "auto" }}
        className="img-thumbnail"
      />
    );
  };

  onUploadImg = e => {
    const value = e.target.files[0];
    this.userData.set("avatar", value);

    const reader = new FileReader();

    reader.onload = function(e) {
      //console.log(e);
      document.querySelector("#avatarImg").setAttribute("src", e.target.result);
    };

    reader.readAsDataURL(value);
  };

  onClickSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    const { name, about } = this.state;
    if (name === "") {
      return this.setState({
        loading: false,
        error: "Your name must me provided!"
      });
    }
    this.setState({ error: "" });
    const userObj = { name: name.trim(), about: about.trim() };
    const data = await updateUser(userObj);
    this.setState({ loading: false });
    if (data.error) {
      this.setState({ error: data.error.errmsg });
    } else this.setState({ reDirectToProfile: true });
  };

  onInputChange = name => e => {
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  onSubmitImg = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    const data = await uploadAvatar(this.userData);
    this.setState({ loading: false });
    if (data.error) this.setState({ error: data.error.errmsg });
  };

  async componentDidMount() {
    const user = await fetchUserById(this.props.match.params.userId);
    this.userData = new FormData();
    if (user.error) this.setState({ error: user.error.errmsg });
    else {
      const { _id, name, email, about, avatar } = user;
      this.setState({ _id, name, email, about, avatar });
    }
  }

  render() {
    // if (this.state.reDirect)
    //   return <Link to={`/users/edit/${this.state._id}`}></Link>;
    if (this.state.reDirectToProfile)
      return <Redirect to={`/${this.state._id}`}></Redirect>;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Edit Your Profile</h2>

        <div
          className="alert alert-danger"
          style={{ display: this.state.error ? "" : "none" }}
        >
          {this.state.error}
        </div>

        {this.renderLoading()}
        {this.renderImg()}

        <form action="/" method="POST" enctype="multipart/form-data">
          <input
            id="imgInp"
            type="file"
            name="avatar"
            onChange={this.onUploadImg}
            accept="image/x-png,image/jpg,image/jpeg"
          />
          <div>
            <button
              onClick={this.onSubmitImg}
              className="btn btn-raised btn-primary mt-2"
            >
              Update Your Avatar
            </button>
          </div>
        </form>

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
            <label className="text-muted">About</label>
            <input
              onChange={this.onInputChange("about")}
              className="form-control"
              value={this.state.about}
            ></input>
          </div>

          <button
            onClick={this.onClickSubmit}
            className="btn btn-raised btn-primary"
          >
            Update
          </button>
        </form>
      </div>
    );
  }
}

export default EditUser;
