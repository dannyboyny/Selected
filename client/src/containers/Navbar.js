import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import logo from '../logo.svg';
import MessageList from '../components/MessageList';
import Badge from '@material-ui/core/Badge';

const TabContainer = (props) => {
  return (
    <Typography component='div' style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  newBadge: {
    color: 'orange',
    fontWeight: 'bold'
  },
  margin: {
    margin: theme.spacing.unit * 2,
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
  button: {
    margin: theme.spacing.unit,
  }
});

class Navbar extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { classes, messages } = this.props;
    const unreadMessages = messages ? messages.filter(message => !message.answered) : 0;
    const messagesTab = unreadMessages ? (
      <Tab
        label={
          <Badge className={classes.padding} color="secondary" badgeContent={unreadMessages.length}>
            Messages
          </Badge>
        }
      />
    )
    : (<Tab label='Messages' />);
    return (
      <div className={classes.root}>
        <AppBar position='static' color='default'>
          <img src={logo} alt='logo' />
          <Tabs value={value} onChange={this.handleChange}>
            {messagesTab}
            <Tab label='Schools' />
            <Tab label='Profile' />
          </Tabs>
        </AppBar>
        {value === 0 &&
          <TabContainer>
            <Button
              variant='contained'
              className={classes.button}
              onClick={() => this.props.createMessage('Sample Message')}
            >
              Generate Message
            </Button>
            <MessageList
              messages={messages}
              updateMessage={this.props.updateMessage}
            />
          </TabContainer>
        }
        {value === 1 && <TabContainer>Schools</TabContainer>}
        {value === 2 && <TabContainer>Profile</TabContainer>}
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  createMessage: PropTypes.func.isRequired,
  updateMessage: PropTypes.func.isRequired
};

export default withStyles(styles)(Navbar);
