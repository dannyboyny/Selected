import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import logo from '../logo.svg';

const TabContainer = (props) => {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = {
  root: {
    flexGrow: 1,
  },
};

class Navbar extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <img src={logo} alt="logo" />
            <Typography variant="title" color="inherit">
              New
            </Typography>
          </Toolbar>
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Messages" />
            <Tab label="Schools" />
            <Tab label="Profile" href="#basic-tabs" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>Messages</TabContainer>}
        {value === 1 && <TabContainer>Schools</TabContainer>}
        {value === 2 && <TabContainer>Profile</TabContainer>}
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);