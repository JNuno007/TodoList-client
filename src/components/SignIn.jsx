import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { toast } from "react-toastify";
import { toastConfig, SIGN_IN_URL } from "../utils/constants";
import axios from "axios";
import { Center } from "../utils/styles-comp";

export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
  }

  handleToast = (type, message) => {
    if (type === "success") {
      toast.success(message, toastConfig);
    } else {
      toast.error(message, toastConfig);
    }
  };

  handleUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    axios
      .get(window.origin + SIGN_IN_URL, {
        params: {
          username,
          password,
        },
      })
      .then((resp) => {
        if (resp.status === 200) {
          this.handleToast("success", "Welcome back!");
          localStorage.setItem("JWT", resp.data.token);
          window.location.href = "/projects";
        } else {
          this.handleToast("error", "Please try again.");
        }
      })
      .catch((err) => {
        this.handleToast("error", err.response.data.message);
      });
  };

  render() {
    return (
      <Container component='main' maxWidth='xs' style={{ height: "100vh" }}>
        <Center>
          <Typography component='h1' variant='h5'>
            Sign in
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
            <Button type='submit' fullWidth variant='contained' color='primary'>
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href='#' variant='body2' onClick={this.props.handleSign}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Center>
      </Container>
    );
  }
}
