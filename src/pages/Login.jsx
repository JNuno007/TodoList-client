import React, { Component } from "react";
import Navbar from "../components/Navbar";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      isSignIn: true,
    };
  }

  componentDidMount(){
    if(localStorage.getItem("JWT")){
      window.location.href = "/projects";
    }
  }

  handleSign = (e) => {
    e?.preventDefault();
    this.setState({
      isSignIn: !this.state.isSignIn,
    });
  };

  render() {
    const {isSignIn} = this.state;
    return (
      <div style={{ height: "100vh" }}>
        <Navbar />
        {isSignIn ? (
          <SignIn handleSign={this.handleSign} />
        ) : (
          <SignUp handleSign={this.handleSign} />
        )}
      </div>
    );
  }
}
