import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  newBadge: {
    color: 'orange',
    fontWeight: 'bold'
  },
  button: {
    margin: theme.spacing.unit,
  }
});

class MessageList extends Component {
  handleRespond = (message) => {
    this.props.updateMessage(message);
  }

  render() {
    const { classes, messages } = this.props;
    const messageList = [];
    let messageCount = 0;
    messages.forEach(message => {
      messageCount += 1;
      const messageBadge = message.answered ? '' : (<span className={classes.newBadge}>New </span>);
      messageList.push(
        <ExpansionPanel key={messageCount}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography className={classes.heading}>
              {messageBadge}Message {messageCount}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {message.text}
              <Button
              variant='contained'
              className={classes.button}
              onClick={() => this.handleRespond(message)}
            >
              Respond
            </Button>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    });
  
    return (
      <div className={classes.root}>
        {messageList}
      </div>
    );
  }
}

MessageList.propTypes = {
  classes: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  updateMessage: PropTypes.func.isRequired
};

export default withStyles(styles)(MessageList);
