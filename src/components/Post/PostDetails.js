import React from "react";
import { getPostById, getOwnerDetails } from "./apiPost";
import SinglePost from "./SinglePost";

class PostDetails extends React.Component {
  state = { post: null, owner: [], error: null };

  getOwner = async postId => {
    const data = await getOwnerDetails(postId);
    if (data.error) return "Unknown";
    return data;
  };

  async componentDidMount() {
    const postId = this.props.match.params.postId;
    const post = await getPostById(postId);
    if (post.error) return this.setState({ error: post.error });
    this.setState({ post });
  }

  renderLoading = () => {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  };

  render() {
    const { post } = this.state;
    if (!post) {
      return this.renderLoading();
    }
    return (
      <div>
        <SinglePost post={post} />
      </div>
    );
  }
}

export default PostDetails;
