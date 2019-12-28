import React from "react";
import Posts from "../Post/Posts";

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="jumbotron">
          <h2>Recent Posts</h2>
        </div>
        <Posts />
      </div>
    );
  }
}

export default Home;
