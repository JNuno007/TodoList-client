import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { toast } from "react-toastify";
import { toastConfig, SIGN_UP_URL } from "../utils/constants";
import axios from "axios";
import { Center } from "../utils/styles-comp";

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleToast = (type, message) => {
    if (type === "success") {
      toast.success(message, toastConfig);
    } else {
      toast.error(message, toastConfig);
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, confirmPassword } = this.state;

    if (password === confirmPassword) {
      //send data to server
      axios
        .post(window.origin + SIGN_UP_URL, {
          username,
          password,
        })
        .then((resp) => {
          const status = resp.status;
          if (status === 200) {
            this.handleToast("success", "Account created! Please sign in.");
          } else {
            this.handleToast("error", "Something went wrong, please try again");
          }
        })
        .catch((err) => {
          this.handleToast("error", err.response.data.message);
        });
    } else {
      this.handleToast("error", "Passwords do not match, please try again.");
    }
  };

  handleUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleConfirmPassord = (e) => {
    this.setState({ confirmPassword: e.target.value });
  };

  render() {
    return (
      <Container component='main' maxWidth='xs' style={{ height: "100vh" }}>
        <Center>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              autoComplete='text'
              autoFocus
              onChange={this.handleUsername}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={this.handlePassword}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='confirm password'
              label='Confirm Password'
              type='password'
              id='confirm-password'
              autoComplete='current-password'
              onChange={this.handleConfirmPassord}
            />
            <Button type='submit' fullWidth variant='contained' color='primary'>
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href='' variant='body2' onClick={this.props.handleSign}>
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Center>
      </Container>
    );
  }
}
