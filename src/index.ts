import * as dotenv from "dotenv";
dotenv.config();


import {Options} from "graphql-yoga";
import {createConnection} from "typeorm";
import connectionOptions from "./ormConfig";
import app from "./app";

console.log(process.env);

const PORT : number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT : string = "/playground";
const GRAPHQL_ENDPOINT : string = "/graphql";

const appOptions:Options = {
    port: PORT ,
    playground: PLAYGROUND_ENDPOINT,
    endpoint: GRAPHQL_ENDPOINT
};

const handleAppStart = () => console.log(`listening on port ${PORT}`);

createConnection(connectionOptions).then(() => {
    app.start(appOptions, handleAppStart);    
});
