import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";

import Header from "./pages/Header";
import Footer from "./pages/Footer";
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/UserProfile";
import Exercise from "./pages/Exercise";
import ExerciseSearch from "./pages/ExerciseSearch";
import FriendWork from "./pages/FriendWork";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={SignUp} />
          <Route path="/user/signup" render={props => <SignUp {...props} />} />
          <Route path="/user/login" component={SignUp} />

          <Route exact path="/users" component={UserProfile} />
          <Route
            path="/user/:email"
            render={props => <FriendWork {...props} />}
          />
          <Route
            path="/exercises/:id"
            render={props => <Exercise {...props} />}
          />
          <Route
            exact
            path="/exercises"
            render={props => <ExerciseSearch {...props} />}
          />
          <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
        <Footer />
      </div>
    );
  }
}
