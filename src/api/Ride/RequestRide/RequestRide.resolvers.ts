import {Resolvers} from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { RequestRideMutationArgs, RequestRideResponse } from "src/types/graph";
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";

const resolvers:Resolvers = {
    Mutation:{
        RequestRide: privateResolver(
            async(_, args:RequestRideMutationArgs, {req, pubSub}):Promise<RequestRideResponse> =>{
                try{
                    const user:User = req.user;
                    if(!user.isRiding){
                        const ride = await Ride.create({...args,passenger:user}).save();
                        pubSub.publish("rideRequest", {NearbyRideSubscription:ride})
                        User.update({id:user.id},{isRiding:true});
                        return{
                        ok:true,
                        error:null,
                        ride
                    }
                    } else{
                        return{
                            ok:false,
                            error:"U can't request two rides",
                            ride:null
                        }
                    }
                
                } catch(error) {
                    return{
                        ok:false,
                        error:error.message,
                        ride:null
                    }
                }

            }
        )
    }
}

export default resolvers;