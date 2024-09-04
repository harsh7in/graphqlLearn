const express = require('express');
const {ApolloServer}  = require('@apollo/server');
const { expressMiddleware} = require('@apollo/server/express4');
const bodyParser = require('body-parser');
const cors = require('cors');



async function startWorking(){

    const app = express();
    const server = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String
            }
        `,
        resolvers: {
            Query: {
                hello: () => 'Hello World!',
            },
        },
    });

    app.use(bodyParser.json());
    app.use(cors());

    await server.start();

    app.use("/graphql",expressMiddleware(server));


    app.listen(3000, () =>
        console.log(`Server ready at PORT 3000`)
    );

}




startWorking();