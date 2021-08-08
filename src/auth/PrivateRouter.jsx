import React, { Component } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { AuthHelper } from "./AuthHelper";

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      haveAccess: false,
      loaded: false,
      user: null
    };
  }

  componentDidMount() {
    this.checkAccess();
  }

  checkAccess = () => {
    AuthHelper.authenticate((access, user) => {
      this.setState({
        haveAccess: access,
        loaded: true,
        user: user
      });
    });
  };

  render() {
    const { component: Component, ...rest } = this.props;
    const { loaded, haveAccess } = this.state;
    if (!loaded) return null;
    return (
      <Route
        {...rest}
        render={props => {
          return haveAccess ? (
            <Component {...props}/>
          ) : (
            <Redirect
              to={{
                pathname: "/login"
              }}
            />
          );
        }}
      />
    );
  }
}

export default withRouter(PrivateRoute);