import React from "react";
import { getAllPosts } from "./apiPost";
import PostCard from "./PostCartd";

class Posts extends React.Component {
  state = { posts: [], error: null };

  async componentDidMount() {
    const posts = await getAllPosts();
    this.setState({ posts });
  }

  renderPosts = () => {
    const { posts } = this.state;
    return (
      <div className="ui cards special">
        {posts.map(post => {
          return <PostCard post={post} key={post._id} />;
        })}
      </div>
    );
  };

  render() {
    return (
      <div className="container">
        <h3 className="">
          {!this.state.posts.length ? (
            <div className="ui active dimmer">
              <div className="ui huge text loader">Fetching Posts ...</div>
            </div>
          ) : (
            <div></div>
          )}
        </h3>
        {this.renderPosts()}
      </div>
    );
  }
}

export default Posts;
