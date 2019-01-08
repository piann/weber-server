import {Resolvers} from "../../../types/resolvers";
import privateResolver from "src/utils/privateResolver";
import { UpdateRideStatusMutationArgs, UpdateRideStatusResponse } from "src/types/graph";
import User from "../../../entities/User";
import Ride from "src/entities/Ride";

const resolvers:Resolvers = {
    Mutation:{
        UpdateRideStatus: privateResolver(
            async(_,args:UpdateRideStatusMutationArgs,{req}):Promise<UpdateRideStatusResponse>=>{
                const user:User = req.user;
                const status = args.status;
                
                if(user.isDriving){
                    try{
                        let ride:Ride | undefined;
                        if(args.status === "ACCEPTED"){
                        ride = await Ride.findOne({id:args.rideId, status:"REQUESTING"});
                        
                        if(ride){
                            ride.driver = user;
                            user.isTaken=true;
                            ride.save();
                            user.save();
                        }
                        }else{
                            ride = await Ride.findOne({id:args.rideId, driver:user})
                        }
                        if(ride){
                            ride.status = args.status;
                            ride.status
                            return{
                                ok:true,
                                error:null
                            }
                        } else {
                            return{
                                ok:false,
                                error: "Can't find proper ride by id"
                            }
                        }
                        
                    } catch(error){
                        return{
                            ok:false,
                            error:error.message,
                        }
                    }
                
                    } else {
                        return{
                            ok:false,
                            error:"You are not Driving",
                        }

                }
            }
        )
    }
}

export default resolvers;