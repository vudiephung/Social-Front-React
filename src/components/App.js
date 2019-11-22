import React from "react";
import MainRouter from "./MainRouter";
import { BrowserRouter } from "react-router-dom";

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    );
  }
}

export default App;
