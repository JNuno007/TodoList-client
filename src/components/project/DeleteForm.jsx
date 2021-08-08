import React, { Component } from "react";
import { Button, Container, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import { PROJECT_REMOVE_URL, toastConfig } from "../../utils/constants";
import { toast } from "react-toastify";

export default class DeleteForm extends Component {
  constructor(props) {
    super(props);
  }

  handleToast = (type, message) => {
    if (type === "success") {
      toast.success(message, toastConfig);
    } else {
      toast.error(message, toastConfig);
    }
  };

  cancelClick = () => {
    this.props.modal.current.handleClose();
  };

  deleteClick = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("JWT");
    axios
      .post(
        window.origin + PROJECT_REMOVE_URL,
        {
          projectId: this.props.project._id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      )
      .then((resp) => {
        if (resp.status === 200) {
          this.handleToast("success", "Project and respective tasks deleted!");
          //Send to Side Menu the new project
          this.props.getProjects();
          this.props.modal.current.handleClose();
        } else {
          this.handleToast(
            "error",
            "Could not delete the project, please try again.",
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
        <Typography component='h2' variant='h6'>
          {`Delete project "${this.props.project.title}"?`}
        </Typography>
        <br />
        <Button
          fullWidth
          variant='contained'
          color='secondary'
          onClick={this.deleteClick}
        >
          Delete
        </Button>
        <p></p>
        <Button fullWidth variant='contained' onClick={this.cancelClick}>
          Cancel
        </Button>
      </Container>
    );
  }
}
