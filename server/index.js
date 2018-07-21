const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/selected', { useNewUrlParser: true });

// MongoDB Schema
const Message = mongoose.model('Message', {
  text: String,
  answered: Boolean
});

// GraphQL Schema, Querys and Mutations
const typeDefs = `
  type Query {
    messages: [Message]
  }
  type Message {
    id: ID!
    text: String!
    answered: Boolean!
  }
  type Mutation {
    createMessage(text: String!): Message
  }
`;

const resolvers = {
  Query: {
    messages: () => Message.find()
  },
  Mutation: {
    createMessage: async (_, { text }) => {
      const message = new Message({ text, answered: false });
      await message.save();
      return message;
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
    server.start(() => console.log('Server is running on localhost:4000'));
});
