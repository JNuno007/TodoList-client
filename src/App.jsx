import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import Login from "./pages/Login";
import Project from "./pages/Project";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRouter from "./auth/PrivateRouter";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Project} /> 
            <Route exact path="/login" component={Login} />
            <PrivateRouter exact path="/projects" component={Project} />
            <Redirect to="/" />
          </Switch>
        </Router>
        <ToastContainer />
      </div>
    );
  }
}
