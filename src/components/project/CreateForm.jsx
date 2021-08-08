import { Button, Container, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import { toastConfig, PROJECT_CREATE_URL } from "../../utils/constants";
import { toast } from "react-toastify";

export default class CreateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
    };
  }

  handleToast = (type, message) => {
    if (type === "success") {
      toast.success(message, toastConfig);
    } else {
      toast.error(message, toastConfig);
    }
  };

  handleTitle = (e) => {
    this.setState({ title: e.target.value });
  };

  handleDescription = (e) => {
    this.setState({ description: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, description } = this.state;
    const token = localStorage.getItem("JWT");
    axios
      .post(
        window.origin + PROJECT_CREATE_URL,
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      )
      .then((resp) => {
        if (resp.status === 200) {
          this.handleToast("success", "Project created!");
          //Send to Side Menu the new project
          this.props.getProjects();
          this.props.modal.current.handleClose();
        } else {
          this.handleToast(
            "error",
            "Could not create the project, please try again.",
          );
        }
      })
      .catch((err) => {
        this.handleToast("error", err.response.data.message);
      });
  };

  render() {
    return (
      <Container component='main' maxWidth='xs'>
        <Typography component='h1' variant='h5'>
          Add Project
        </Typography>
        <form onSubmit={this.handleSubmit}>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='name'
            label='Name'
            name='name'
            autoFocus
            onChange={this.handleTitle}
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='description'
            label='Description'
            type='text'
            id='description'
            onChange={this.handleDescription}
          />
          <Button type='submit' fullWidth variant='contained' color='primary'>
            Add Project
          </Button>
        </form>
      </Container>
    );
  }
}
