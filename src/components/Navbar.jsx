import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  withStyles,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import React, { Component } from "react";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
});

class Navbar extends Component {
  handleSignOut = () => {
    localStorage.removeItem("JWT");
    window.location.href = "/login";
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position='static' color='primary'>
          <Toolbar>
            <Typography variant='h6' className={classes.title}>
              TODO List App
            </Typography>
            {this.props.signout && (
              <Button color='inherit' onClick={this.handleSignOut}>
                Sign out
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Navbar);
