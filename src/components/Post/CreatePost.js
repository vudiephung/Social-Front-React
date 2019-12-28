import React from "react";
import { create, uploadPhoto } from "./apiPost";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import axios from "axios";
import DefaultPhoto from "../img/post.jpg";

class CreatePost extends React.Component {
  state = {
    post: null,
    title: "",
    body: "",
    error: null,
    message: null,
    media: "",
    mediaPreview: "",
    reDirectToPostsList: false,
    loading: false,
    user: null
  };

  // renderImg = () => {
  //   return (
  //     <img
  //       id="postPhoto"
  //       src={`/`}
  //       style={{ height: "200px", width: "auto" }}
  //       className="img-thumbnail"
  //     />
  //   );
  // };

  // onUploadPhoto = e => {
  //   const value = e.target.files[0];
  //   this.postData.set("photo", value);
  //   const reader = new FileReader();
  //   reader.onload = e => {
  //     document.querySelector("#postPhoto").setAttribute("src", e.target.result);
  //   };
  //   reader.readAsDataURL(value);
  // };

  // onSubmitPhoto = async e => {
  //   e.preventDefault();
  //   this.setState({ loading: true });
  //   const data = await uploadPhoto(this.postData);
  //   this.setState({ loading: false });
  //   if (data.error) this.setState({ error: data.error });
  // };

  // uploadPhotoForm = () => {
  //   return (
  //     <form action="/" method="POST" enctype="multipart/form-data">
  //       <input
  //         id="imgInp"
  //         type="file"
  //         name="photo"
  //         onChange={this.onUploadPhoto}
  //         accept="image/x-png,image/jpg,image/jpeg"
  //       />
  //       <div>
  //         <button
  //           onClick={this.onSubmitPhoto}
  //           className="btn btn-raised btn-primary mt-2"
  //         >
  //           Upload Photo
  //         </button>
  //       </div>
  //     </form>
  //   );
  // };

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

  onClickSubmit = async e => {
    e.preventDefault();
    if (!this.state.title || !this.state.body) {
      return this.setState({ error: "Title and Body must be provided." });
    } else if (
      this.state.title.length < 4 ||
      this.state.title.length > 150 ||
      this.state.body.length < 4 ||
      this.state.body.length > 150
    ) {
      return this.setState({
        error: "Title and Body must be between 4 and 150 characters"
      });
    }
    this.setState({ loading: true });
    const mediaUrl = this.state.media ? await this.onSubmitImg() : "";
    const { title, body } = this.state;
    const postObj = { title, body, mediaUrl };
    const data = await create(postObj);
    this.setState({ post: data });
    this.setState({ loading: false });
    if (data.error) this.setState({ error: data.error });
    else
      this.setState({
        title: "",
        body: "",
        reDirectToPostsList: true
      });
  };

  onInputChange = name => e => {
    const { value, files } = e.target;
    if (name === "photo") {
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

  renderImg = () => {
    const imgUrl = this.state.mediaPreview
      ? this.state.mediaPreview
      : DefaultPhoto;
    return (
      <img
        src={imgUrl}
        onError={img => (img.target.src = `${DefaultPhoto}`)}
        alt={this.state.title}
        style={{ height: "300px", width: "auto" }}
        className="img-thumbnail mb-2"
      />
    );
  };

  async componentDidMount() {
    this.setState({ user: isAuthenticated().user });
  }

  render() {
    if (this.state.reDirectToPostsList) return <Redirect to={`/`}></Redirect>;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Create a new Post</h2>

        <div
          className="alert alert-danger"
          style={{ display: this.state.error ? "" : "none" }}
        >
          {this.state.error}
        </div>

        {this.renderImg()}

        <form>
          <input
            style={{ marginBottom: "1em" }}
            type="file"
            name="photo"
            onChange={this.onInputChange("photo")}
            accept="image/*"
          />
          <div className="form-group">
            <label className="text-muted">Title</label>
            <input
              className="form-control"
              onChange={this.onInputChange("title")}
            ></input>
          </div>

          <div className="form-group">
            <label className="text-muted">Body</label>
            <input
              onChange={this.onInputChange("body")}
              className="form-control"
            ></input>
          </div>

          <button
            onClick={this.onClickSubmit}
            className={`ui ${
              this.state.loading ? "disabled loading" : ""
            } teal button`}
          >
            Create
          </button>
        </form>
      </div>
    );
  }
}

export default CreatePost;
