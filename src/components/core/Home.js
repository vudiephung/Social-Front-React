import React from "react";
import Posts from "../Post/Posts";

class Home extends React.Component {
  render() {
    return (
      <div>
        <div className="jumbotron">
          <h2>Home</h2>
          Welcome to React Frontend
        </div>
        <Posts />
      </div>
    );
  }
}

export default Home;
