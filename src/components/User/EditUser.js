import React from "react";
import { fetchUserById, updateUser } from "./apiUser";
import { Redirect } from "react-router-dom";
import defaultAvatar from "../img/avatar.jpg";
import axios from "axios";

class EditUser extends React.Component {
  state = {
    _id: "",
    name: "",
    about: "",
    error: "",
    avatar: "",
    media: "",
    mediaPreview: "",
    reDirectToProfile: false,
    loading: false
  };

  // renderLoading = () => {
  //   if (this.state.loading) {
  //     return (
  //       <div className="jumbotron text-center">
  //         <h2>Loading...</h2>
  //       </div>
  //     );
  //   }
  //   return "";
  // };

  renderImg = () => {
    const avatarUrl = this.state.mediaPreview
      ? this.state.mediaPreview
      : this.state.avatar;
    //console.log("avatar url", avatarUrl);
    return (
      <img
        src={avatarUrl}
        onError={img => (img.target.src = `${defaultAvatar}`)}
        alt={this.state.title}
        style={{ height: "300px", width: "auto" }}
        className="img-thumbnail mb-2"
      />
    );
  };

  onClickSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    let { name, about } = this.state;
    const avatar = await this.onSubmitImg();
    if (name === "") {
      return this.setState({
        loading: false,
        error: "Your name must me provided!"
      });
    }
    about = about ? about : ""
    this.setState({ error: "" });
    const userObj = { name: name.trim(), about: about.trim(), avatar };
    const data = await updateUser(userObj);
    this.setState({ loading: false });
    if (data.error) {
      this.setState({ error: data.error.errmsg });
    } else this.setState({ reDirectToProfile: true });
  };

  onInputChange = name => e => {
    const { value, files } = e.target;
    if (name === "avatar") {
      this.setState({
        media: files[0],
        mediaPreview: window.URL.createObjectURL(files[0])
      });
    } else this.setState({ [name]: value });
  };

  onSubmitImg = async () => {
    if (this.state.media) {
      const data = new FormData();
      data.append("file", this.state.media);
      data.append("upload_preset", "hung-social");
      data.append("cloud_name", "hung-vu");
      data.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY);
      const response = await axios.post(
        process.env.REACT_APP_CLOUDINARY_URL,
        data
      );
      const mediaUrl = response.data.url;
      return mediaUrl;
    } else {
      console.log("no media in state");
      return;
    }
  };

  async componentDidMount() {
    const user = await fetchUserById(this.props.match.params.userId);
    if (user.error) this.setState({ error: user.error.errmsg });
    else {
      const { _id, name, email, about, avatar } = user;
      this.setState({ _id, name, email, about, avatar });
    }
  }

  render() {
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

        {this.renderImg()}

        <form>
          <input
            type="file"
            name="avatar"
            onChange={this.onInputChange("avatar")}
            accept="image/*"
            style={{ marginBottom: "1rem" }}
          />

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
            className={`ui ${
              this.state.loading ? "disabled loading" : ""
            } teal button`}
          >
            Update
          </button>
        </form>
      </div>
    );
  }
}

export default EditUser;
