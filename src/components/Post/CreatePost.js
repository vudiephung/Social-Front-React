import React from "react";
import { create, uploadPhoto } from "./apiPost";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";

class CreatePost extends React.Component {
  state = {
    post: null,
    title: "",
    body: "",
    error: null,
    message: null,
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

  onClickSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    const { title, body } = this.state;
    const postObj = { title, body };
    //console.log(postObj);
    const data = await create(postObj);
    this.setState({ post: data });
    //console.log(data);
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
    this.setState({ [name]: e.target.value });
  };

  async componentDidMount() {
    this.postData = new FormData();
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

        {this.renderLoading()}

        <form>
          <div className="form-group">
            <label className="text-muted">Titlte</label>
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
            className="btn btn-raised btn-primary"
          >
            Create
          </button>
        </form>
      </div>
    );
  }
}

export default CreatePost;
