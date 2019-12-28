import React from "react";
import defaultPhoto from "../img/post.jpg";
import defaultAvatar from "../img/avatar.jpg";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/index";
import moment from "moment";

class PostCard extends React.Component {
  renderImg = post => {
    return (
      <img
        src={post.mediaUrl}
        alt={post.title}
        onError={i => (i.target.src = `${defaultPhoto}`)}
      />
    );
  };

  renderOwnerAvatar = owner => {
    const imgUrl = owner.avatar ? owner.avatar : defaultAvatar;
    return <img className="ui avatar image" src={imgUrl} />;
  };

  // renderBodyText = text => {
  //   const words = text.split(" ");
  //   if (words.length <= 4) return text;
  //   else {
  //     let res = "";
  //     for (let i = 0; i < 4; i++) {
  //       res += words[i];
  //       res += " ";
  //     }
  //     return res + " ...";
  //   }
  // };

  render() {
    const { post } = this.props;
    const { owner } = post;
    const createdAt = moment(post.createdAt).calendar();

    let ownerName = owner.name;
    if (isAuthenticated()) {
      const currentUser = isAuthenticated().user;
      if (owner._id === currentUser._id) ownerName = `${ownerName} (Me)`;
    }

    // return (
    //   <div
    //     ref={this.postRef}
    //     className="card col-md-3 ml-5 mt-5"
    //     style={{ width: "18rem" }}
    //   >
    //     {this.renderImg(post)}
    //     <div className="card-body">
    //       <h5 className="card-title">{post.title}</h5>
    //       <p className="card-text">{this.renderBodyText(post.body)}</p>
    //       <br />
    //       <p className="font-italic mark">
    //         Posted By <Link to={`/${owner._id}`}>{`${ownerName}`}</Link> on{" "}
    //         {createdAt}
    //       </p>
    //       <Link
    //         to={`/post/${post._id}`}
    //         className="btn btn-raised btn-primary card-link"
    //       >
    //         Read More
    //       </Link>
    //       {isAuthenticated() && isAuthenticated().user._id === owner._id ? (
    //         <Link
    //           to={`/post/${post._id}/edit`}
    //           className="btn btn-raised btn-info card-link"
    //         >
    //           Update
    //         </Link>
    //       ) : (
    //         <div></div>
    //       )}
    //     </div>
    //   </div>
    // );

    return (
      <Link to={`/post/${post._id}`} className="ui teal card">
        <div className="content">
          <div className="right floated meta">{createdAt}</div>
          <Link to={`/${owner._id}`}>
            {this.renderOwnerAvatar(owner)} {ownerName}
          </Link>
        </div>
        <div className="image">{this.renderImg(post)}</div>
        <div className="content">
          <span className="right floated">
            <i className="heart outline red like icon"></i>
            {post.likes.length}
          </span>
          <i className="comment icon"></i>
          {post.comments.length}
        </div>
      </Link>
    );
  }
}

export default PostCard;
