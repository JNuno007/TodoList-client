import React, { Component } from "react";
import Navbar from "../components/Navbar";
import SideMenu from "../components/SideMenu";
import { Flex } from "../utils/styles-comp";
import Dashboard from "./Dashboard";

export default class Project extends Component {
  constructor() {
    super();
    this.state = {
      selectedProject: null,
    };
  }

  handleSelectedProject = (selectedProject) => {
    console.log(selectedProject);
    this.setState({
      selectedProject,
    });
  };

  render() {
    return (
      <div style={{ height: "100vh" }}>
        <Navbar signout />
        <Flex>
          <SideMenu handleSelectedProject={this.handleSelectedProject} />
          <Dashboard selectedProject={this.state.selectedProject} />
        </Flex>
      </div>
    );
  }
}
