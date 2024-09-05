const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const bodyParser = require('body-parser');
const cors = require('cors');
const { TODOS } = require('./todo');
const { USER } = require('./user');

async function startWorking() {

    // console.log(USER)
    const app = express();

    const typeDefs = `
            type Todo {
                id: ID!
                title: String!
                completed: Boolean
                user:User
            }
            
            type User {
                id: ID!
                name:String!
                website:String!
                email: String!
                username:String!
            }

            type Query {
                hello: String
                getTodos: [Todo]
                getAllUsers: [User]
            }
        `
    const resolvers = {
        Todo: {
            user: (todo) => USER.find((e) => e.id === todo.id),
        },
        Query: {
            hello: () => 'Hello World!',
            getTodos: () => TODOS,
            getAllUsers: () => USER
        },
    }




    const server = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers
    });


    app.use(bodyParser.json());
    app.use(cors());

    await server.start();

    app.use("/graphql", expressMiddleware(server));


    app.listen(3000, () =>
        console.log(`Server ready at PORT 3000`)
    );

}




startWorking();