import React from "react";
import { getPostById, update, uploadPhoto } from "./apiPost";
import { Redirect } from "react-router-dom";
import DefaultPhoto from "../img/post.jpg";

class EditPost extends React.Component {
  state = {
    _id: "",
    title: "",
    body: "",
    error: null,
    photo: null,
    Redirect: false,
    loading: false
  };

  onInputChange = name => e => {
    const value = e.target.value;
    this.setState({ [name]: value });
  };

  renderImg = () => {
    const photoURL = `${process.env.REACT_APP_API_URL}/posts/photo/${this.state._id}`;
    //const photoURL = `data:image/png;base64,${this.state.avatar.data}`;
    return (
      <img
        id="photoImg"
        src={photoURL}
        onError={img => (img.target.src = `${DefaultPhoto}`)}
        alt={this.state.name}
        style={{ height: "200px", width: "auto" }}
        className="img-thumbnail"
      />
    );
  };

  onUploadImg = e => {
    const value = e.target.files[0];
    this.postData.set("photo", value);

    const reader = new FileReader();

    reader.onload = function(e) {
      //console.log(e);
      document.querySelector("#photoImg").setAttribute("src", e.target.result);
    };

    reader.readAsDataURL(value);
  };

  onSubmitImg = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    const data = await uploadPhoto(this.postData, this.state._id);
    this.setState({ loading: false });
    if (data.error) this.setState({ error: data.error.errmsg });
  };

  onClickSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    const { _id, title, body } = this.state;
    if (title === "" || body === "") {
      return this.setState({
        loading: false,
        error: "Title and Body must be provided!"
      });
    }
    const updateObj = { title: title.trim(), body: body.trim() };
    //console.log(updateObj, _id);
    const response = await update(_id, updateObj);
    //console.log(response);
    this.setState({ loading: false });
    if (response.error) this.setState({ error: response.error });
    else this.setState({ Redirect: true });
  };

  renderLoading = () => {
    if (this.state.loading) {
      return (
        <div className="jumbotron text-center">
          <h2>Loading...</h2>
        </div>
      );
    }
    return <div></div>;
  };

  async componentDidMount() {
    const post = await getPostById(this.props.match.params.postId);
    this.postData = new FormData();
    if (post.error) return this.setState({ error: post.error.errmsg });
    else {
      const { _id, title, body } = post;
      this.setState({ _id, title, body });
    }
  }

  render() {
    if (this.state.Redirect) return <Redirect to={`/`} />;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Edit Your Post</h2>

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
              Upload Photo
            </button>
          </div>
        </form>

        <form>
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
            className="btn btn-raised btn-primary"
          >
            Update
          </button>
        </form>
      </div>
    );
  }
}

export default EditPost;
