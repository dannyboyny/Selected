import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class MessageList extends Component {
  render() {
    const { classes, messages } = this.props;
    const messageList = [];
    let messageCount = 0;
    messages.forEach(message => {
      messageCount += 1;
      messageList.push(
        <ExpansionPanel key={messageCount}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Message {messageCount}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {message.text}
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
  messages: PropTypes.array.isRequired
};

export default withStyles(styles)(MessageList);
