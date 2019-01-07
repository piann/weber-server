import {Resolvers} from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { RequestRideMutationArgs, RequestRideResponse } from "src/types/graph";
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";

const resolvers:Resolvers = {
    Mutation:{
        RequestRide: privateResolver(
            async(_, args:RequestRideMutationArgs, {req}):Promise<RequestRideResponse> =>{
                try{
                    const user:User = req.user;
                    const ride = await Ride.create({...args,passenger:user}).save();
                    return{
                        ok:true,
                        error:null,
                        ride
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