import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import Navbar from './Navbar';

const MessagesQuery = gql`
  {
    messages {
      id
      text
      answered
    }
  }
`;

const CreateMessageMutation = gql`
  mutation($text: String!) {
    createMessage(text: $text) {
      id
      text
      answered
    }
  }
`;

class App extends Component {
  createMessage = async text => {
    await this.props.createMessage({
      variables: {
        text
      },
      update: (store, { data: { createMessage }}) => {
        // Read the data from the cache for this query.
        const data = store.readQuery({ query: MessagesQuery });
        // Add message to data.
        data.messages.unshift(createMessage);
        // Write data back to cache.
        store.writeQuery({ query: MessagesQuery, data });
      }
    })
  };

  render() {
    const {
      data: { loading, messages }
    } = this.props;
    if (loading) return null;
    return (
      <div>
        <Navbar
          messages={messages}
          createMessage={this.createMessage}
        />
      </div>
    );
  }
}

export default compose(
  graphql(CreateMessageMutation, { name: 'createMessage'}),
  graphql(MessagesQuery)
)(App);
