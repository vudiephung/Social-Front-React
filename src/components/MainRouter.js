import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./User/Signup";
import Signin from "./User/Signin";
import Header from "./core/Header";
import Profile from "./User/Profile";
import User from "./User/User";
import EditUser from "./User/EditUser";
import PrivateRoute from "./auth/PrivateRouter";
import FindUserToFollow from "./User/FindUserToFollow";
import CreatePost from "./Post/CreatePost";
import PostDetails from "./Post/PostDetails";
import EditPost from "./Post/EditPost";
import DeletePost from "./Post/DeletePost";

const MainRouter = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/users" component={User} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <PrivateRoute exact path="/post/:postId" component={PostDetails} />
        <PrivateRoute exact path="/post/:postId/edit" component={EditPost} />
        <PrivateRoute
          exact
          path="/post/:postId/delete"
          component={DeletePost}
        />
        <PrivateRoute exact path="/new/post" component={CreatePost} />
        <PrivateRoute exact path="/find" component={FindUserToFollow} />
        <PrivateRoute exact path="/:userId" component={Profile} />
        <PrivateRoute exact path="/users/edit/:userId" component={EditUser} />
      </Switch>
    </div>
  );
};

export default MainRouter;
