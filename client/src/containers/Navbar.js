import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
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
  newBadge: {
    color: 'orange',
    fontWeight: 'bold'
  }
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
    const unread = 1;
    const messagesTab = unread ? (
        <Tab
          label={
            <h4><span style={styles.newBadge}>New</span> Messages</h4>
          }
        />
      )
      : (<Tab label="Messages" />);

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <img src={logo} alt="logo" />
          <Tabs value={value} onChange={this.handleChange}>
            {messagesTab}
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
