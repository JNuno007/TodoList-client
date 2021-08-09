import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FolderIcon from "@material-ui/icons/Folder";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import styled from "styled-components";
import { Button } from "@material-ui/core";
import TransitionModal from "./TransitionModal";
import CreateForm from "./project/CreateForm";
import axios from "axios";
import { toastConfig, PROJECT_GET_URL } from "../utils/constants";
import { toast } from "react-toastify";
import EditForm from "./project/EditForm";
import DeleteForm from "./project/DeleteForm";

const Menu = styled.div`
  width: 300px;
  height: 100%;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default class SideMenu extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      action: "",
      selectedProject: null,
    };
    this.projectModal = React.createRef();
  }

  componentDidMount() {
    //GET projects
    this.getProjects();
  }

  handleToast = (type, message) => {
    if (type === "success") {
      toast.success(message, toastConfig);
    } else {
      toast.error(message, toastConfig);
    }
  };

  handleCreateModal = () => {
    this.setState({ action: "create" });
    this.projectModal.current.handleOpen();
  };

  getProjects = () => {
    const token = localStorage.getItem("JWT");
    axios
      .get(window.origin + PROJECT_GET_URL, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((resp) => {
        if (resp.status === 200) {
          this.setState({
            projects: resp.data.projects,
          });
        }
      })
      .catch((err) => {
        this.handleToast("error", error.response.data.message);
      });
  };

  mapProjects = () => {
    const { projects } = this.state;
    return projects.map((prj) => (
      <ListItem
        button
        key={prj._id}
        id={prj._id}
        onClick={() => this.props.handleSelectedProject(prj)}
      >
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary={prj.title} secondary={prj.description} />
        <IconButton
          color='primary'
          aria-label='edit project'
          component='span'
          onClick={() => this.handleEditProject(prj)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color='secondary'
          aria-label='remove project'
          component='span'
          onClick={() => this.handleRemoveProject(prj)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItem>
    ));
  };

  handleEditProject = (project) => {
    this.setState({
      action: "edit",
      selectedProject: project,
    });
    this.projectModal.current.handleOpen();
  };

  handleRemoveProject = (project) => {
    this.setState({
      action: "remove",
      selectedProject: project,
    });
    this.projectModal.current.handleOpen();
  };

  deselectProject = () => {
    this.props.handleSelectedProject(null);
  };

  render() {
    const { action, selectedProject } = this.state;
    return (
      <Menu>
        <List component='nav' aria-label='main projects'>
          {this.mapProjects()}
        </List>
        <br />
        <Button startIcon={<AddIcon />} onClick={this.handleCreateModal}>
          Add Project
        </Button>
        <TransitionModal ref={this.projectModal}>
          {action === "create" && (
            <CreateForm
              modal={this.projectModal}
              getProjects={this.getProjects}
            />
          )}
          {action === "edit" && (
            <EditForm
              project={selectedProject}
              modal={this.projectModal}
              getProjects={this.getProjects}
            />
          )}
          {action === "remove" && (
            <DeleteForm
              project={selectedProject}
              modal={this.projectModal}
              getProjects={this.getProjects}
              deselectProject={this.deselectProject}
            />
          )}
        </TransitionModal>
      </Menu>
    );
  }
}
