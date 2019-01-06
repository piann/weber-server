import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

const resolvers = {
    Subscription:{
        DriversSubscription:{
            subscribe: withFilter(
                (_,__,{pubSub}) => pubSub.asyncIterator("driverUpdate")
                ,(payload, _, {context}) =>{ //first arg is payload, third arg is context
                    //console.log(`This is coming from the report movement resolver`,payload);
                    //console.log(`Listening : `,context);
                    const user: User = context.currentUser;
                    const {DriversSubscription:{lastLat:driverLastLat, lastLng:driverLastLng, isDriving:drivingStatus}} = payload;
                    const {lastLat : userLastLat, lastLng:userLastLng} = user;
                    return(
                        drivingStatus &&
                        driverLastLat >= userLastLat - 0.05 &&
                        driverLastLat <= userLastLat + 0.05 &&
                        driverLastLng >= userLastLng - 0.05 &&
                        driverLastLng <= userLastLng + 0.05
                    );
                }
            )
            
        }
    }
}

export default resolvers;