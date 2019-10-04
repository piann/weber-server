require('dotenv').config();
///require('now-env');

console.log(process.env);

import {Options} from "graphql-yoga";
import {createConnection} from "typeorm";
import connectionOptions from "./ormConfig";
import app from "./app";
import decodeJWT from "./utils/decodeJWT";

const PORT : number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT : string = "/playground";
const GRAPHQL_ENDPOINT : string = "/graphql";
const SUBSCRIPTION_ENDPOINT : string = "/subscription";

const appOptions:Options = {
    port: PORT ,
    playground: PLAYGROUND_ENDPOINT,
    endpoint: GRAPHQL_ENDPOINT,
    subscriptions:{
        path: SUBSCRIPTION_ENDPOINT,
        onConnect:async connectionParams =>{
            const token = connectionParams['X-JWT'];
            if(token){
                const user = await decodeJWT(token);
                
                if(user){
                    return{
                        currentUser:user
                    }
                }
            }
            throw new Error("No JWT. Can't subscribe"); 

        }
    }
};

const handleAppStart = () => console.log(`listening on port ${PORT}`);


createConnection(connectionOptions).then(() => {
    app.start(appOptions, handleAppStart);    
});
