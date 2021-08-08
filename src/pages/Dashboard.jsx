import {
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { Component } from "react";
import CreateTaskForm from "../components/task/CreateTaskForm";
import TransitionModal from "../components/TransitionModal";
import { TASK_EDIT_URL, TASK_GET_URL, toastConfig } from "../utils/constants";
import { Container } from "../utils/styles-comp";
import { toast } from "react-toastify";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ListIcon from "@material-ui/icons/List";
import ScheduleIcon from "@material-ui/icons/Schedule";
import DoneIcon from "@material-ui/icons/Done";
import EditTaskForm from "../components/task/EditTaskForm";
import DeleteTaskForm from "../components/task/DeleteTaskForm";

const useStyles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
    height: "80%",
    backgroundColor: "#F4F4F4",
  },
  grid: {
    height: "100%",
  },
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      action: null,
      selectedTask: null,
    };
    this.taskModal = React.createRef();
  }

  componentDidMount() {
    if (this.props.selectedProject) {
      this.getTasks();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.selectedProject &&
      prevProps.selectedProject != this.props.selectedProject
    ) {
      this.getTasks();
    }
  }

  handleToast = (type, message) => {
    if (type === "success") {
      toast.success(message, toastConfig);
    } else {
      toast.error(message, toastConfig);
    }
  };

  getTasks = () => {
    const token = localStorage.getItem("JWT");
    axios
      .get(window.origin + TASK_GET_URL, {
        params: {
          projectId: this.props.selectedProject._id,
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((resp) => {
        if (resp.status === 200) {
          this.setState({
            tasks: resp.data.tasks,
          });
        }
      });
  };

  createTask = () => {
    this.setState({
      action: "create",
    });
    this.taskModal.current.handleOpen();
  };

  finishedTask = (tsk) => {
    const token = localStorage.getItem("JWT");
    axios
      .post(
        window.origin + TASK_EDIT_URL,
        {
          taskId: tsk._id,
          title: tsk.title,
          description: tsk.description,
          finished: true,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      )
      .then((resp) => {
        if (resp.status == 200) {
          this.handleToast("success", "Task Finished!");
          this.getTasks();
        } else {
          this.handleToast("error", "Something went wrong.");
        }
      })
      .catch((err) => {
        this.handleToast("error", err.response.data.message);
      });
  };

  handleEditTask = (tsk) => {
    this.setState({
      selectedTask: tsk,
      action: "edit",
    });
    this.taskModal.current.handleOpen();
  };

  handleRemoveTask = (tsk) => {
    this.setState({
      selectedTask: tsk,
      action: "remove",
    });
    this.taskModal.current.handleOpen();
  };

  mapOnGoingTasks = () => {
    const { tasks } = this.state;
    return tasks
      .filter((tsk) => tsk.finishedDate == null)
      .map((tsk) => (
        <ListItem key={tsk._id} id={tsk._id}>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary={tsk.title} secondary={tsk.description} />
          <ScheduleIcon />
          {new Date(tsk.createdDate).toLocaleString()}
          <IconButton
            color='primary'
            aria-label='edit project'
            component='span'
            onClick={() => this.handleEditTask(tsk)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color='secondary'
            aria-label='remove project'
            component='span'
            onClick={() => this.handleRemoveTask(tsk)}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            color='green'
            aria-label='remove project'
            component='span'
            onClick={() => this.finishedTask(tsk)}
          >
            <DoneIcon />
          </IconButton>
        </ListItem>
      ));
  };

  mapFinishedTasks = () => {
    const { tasks } = this.state;
    return tasks
      .filter((tsk) => tsk.finishedDate != null)
      .map((tsk) => (
        <ListItem key={tsk._id} id={tsk._id}>
          <ListItemIcon>
            <DoneIcon />
          </ListItemIcon>
          <ListItemText primary={tsk.title} secondary={tsk.description} />
          <ScheduleIcon />
          {new Date(tsk.finishedDate).toLocaleString()}
        </ListItem>
      ));
  };

  render() {
    const { action, selectedTask } = this.state;
    const { classes, selectedProject } = this.props;
    return (
      <Container>
        {this.state.tasks.length > 0 && (
          <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={12} md={6} padding={2}>
              <Paper className={classes.paper}>
                <strong>On Going Tasks</strong>
                <p></p>
                <br />
                <Button
                  variant='contained'
                  color='primary'
                  onClick={this.createTask}
                >
                  Create Task
                </Button>
                <List component='nav' aria-label='main projects'>
                  {this.mapOnGoingTasks()}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} spacing={2}>
              <Paper className={classes.paper}>
                <strong>Finished Tasks</strong>
                <List component='nav' aria-label='main projects'>
                  {this.mapFinishedTasks()}
                </List>
              </Paper>
            </Grid>
          </Grid>
        )}

        {this.state.tasks.length == 0 && selectedProject && (
          <div style={{ textAlign: "center" }}>
            <h2>This project is empty.</h2>
            <br />
            <Button
              variant='contained'
              color='primary'
              onClick={this.createTask}
            >
              Create Task
            </Button>
          </div>
        )}

        {this.state.tasks.length == 0 && !selectedProject && (
          <div style={{ textAlign: "center" }}>
            <h2>Select a project</h2>
          </div>
        )}
        <TransitionModal ref={this.taskModal}>
          {action === "create" && (
            <CreateTaskForm
              project={selectedProject}
              modal={this.taskModal}
              getTasks={this.getTasks}
            />
          )}
          {action === "edit" && (
            <EditTaskForm
              project={selectedProject}
              task={selectedTask}
              modal={this.taskModal}
              getTasks={this.getTasks}
            />
          )}
          {action === "remove" && (
            <DeleteTaskForm
              project={selectedProject}
              task={selectedTask}
              modal={this.taskModal}
              getTasks={this.getTasks}
            />
          )}
        </TransitionModal>
      </Container>
    );
  }
}

export default withStyles(useStyles)(Dashboard);
