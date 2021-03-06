import React, { Component } from "react";
import { Button, Container, Typography } from "@material-ui/core";
import axios from "axios";
import { TASK_DELETE_URL, toastConfig } from "../../utils/constants";
import { toast } from "react-toastify";

export default class DeleteTaskForm extends Component {
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
        window.origin + TASK_DELETE_URL,
        {
          taskId: this.props.task._id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      )
      .then((resp) => {
        if (resp.status === 200) {
          this.handleToast("success", "Task deleted!");
          this.props.getTasks();
          this.props.modal.current.handleClose();
        } else {
          this.handleToast(
            "error",
            "Could not delete the task, please try again.",
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
          {`Delete task "${this.props.task.title}"?`}
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
