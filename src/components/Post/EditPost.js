import React from "react";
import { getPostById, update } from "./apiPost";
import { Redirect } from "react-router-dom";
import DefaultPhoto from "../img/post.jpg";
import axios from "axios";

class EditPost extends React.Component {
  state = {
    _id: "",
    title: "",
    body: "",
    mediaPreview: "",
    media: "",
    mediaUrl: "",
    error: null,
    Redirect: false,
    loading: false
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

  renderImg = () => {
    const imgUrl = this.state.mediaPreview
      ? this.state.mediaPreview
      : this.state.mediaUrl;
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
      console.log(response.data);
      const mediaUrl = response.data.url;
      return mediaUrl;
    } else {
      console.log("no media in state");
      return;
    }
  };

  onClickSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    const { _id, title, body } = this.state;
    const mediaUrl = await this.onSubmitImg();
    if (title === "" || body === "") {
      return this.setState({
        loading: false,
        error: "Title and Body must be provided!"
      });
    }
    const updateObj = { title: title.trim(), body: body.trim(), mediaUrl };
    //console.log(updateObj, _id);
    const response = await update(_id, updateObj);
    this.setState({ loading: false });
    if (response.error) this.setState({ error: response.error });
    else this.setState({ Redirect: true });
  };

  // renderLoading = () => {
  //   if (this.state.loading) {
  //     return (
  //       <div className="jumbotron text-center">
  //         <h2>Loading...</h2>
  //       </div>
  //     );
  //   }
  //   return <div></div>;
  // };

  async componentDidMount() {
    const post = await getPostById(this.props.match.params.postId);
    if (post.error) return this.setState({ error: post.error.errmsg });
    else {
      const { _id, title, body, mediaUrl } = post;
      this.setState({ _id, title, body, mediaUrl });
    }
  }

  render() {
    if (this.state.Redirect) return <Redirect to={`/`} />;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5 ui header">
          <i className="edit icon" />
          Edit Your Post
        </h2>

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
            <label className="text-muted">Titlte</label>
            <input
              className="form-control"
              onChange={this.onInputChange("title")}
              value={this.state.title}
            ></input>
          </div>

          <div className="form-group">
            <label className="text-muted">Body</label>
            <input
              onChange={this.onInputChange("body")}
              className="form-control"
              value={this.state.body}
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

export default EditPost;
