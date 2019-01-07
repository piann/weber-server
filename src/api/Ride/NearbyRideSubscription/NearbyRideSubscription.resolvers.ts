import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";


const resolvers ={
    Subscription:{
        NearbyRideSubscription:{
        subscribe:withFilter(
            (_,__,{pubSub}) => pubSub.asyncIterator("rideRequest"),
            async(payload,_,{context})=>{
                const user:User = context.currentUser;
                const {NearbyRideSubscription:{pickUpLat,pickUpLng}} = payload;
                const {lastLat:driverLastLat, lastLng:driverLastLng} = user;
                return(
                    pickUpLat >= driverLastLat - 0.05 &&
                    pickUpLat <= driverLastLat + 0.05 &&
                    pickUpLng >= driverLastLng - 0.05 &&
                    pickUpLng <= driverLastLng + 0.05
                );
            }
        )
    }
}
}


export default resolvers;