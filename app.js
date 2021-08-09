const bodyparser = require('body-parser');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();

require('./database/index');
const Event = require('./database/models/Event');

app.use(bodyparser.json());

app.use('/graphql', graphqlHTTP({
  schema: buildSchema(`
    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    type RootQuery {
      events: [Event!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput!): Event
    }

    schema {
      query: RootQuery,
      mutation: RootMutation,
    }
  `),
  rootValue: {
    events: () => {
      return Event.find()
        .then(events => {
          return events.map(event => {
            return { ...event._doc, _id: event.id };
          })
        })
        .catch(err => { throw err; });
    },
    createEvent: (args) => {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
      });

      return event
        .save()
        .then(result => {
          return { ...result._doc };
        })
        .catch(err => {
          console.error(err)
          throw err;
        });
    },
  },
  graphiql: true
}));

app.listen(3000, () => console.log(`App is listening at http://localhost:3000`));
