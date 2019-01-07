import {Resolvers} from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import { GetNearbyRidesResponse } from "src/types/graph";
import { getRepository, Between } from "typeorm";

const resolvers:Resolvers = {
    Query:{
        GetNearbyRides:privateResolver(
            async(_,__,{req}):Promise<GetNearbyRidesResponse> =>{
                try{
                    const user:User = req.user;
                    if(user.isDriving){
                        const {lastLat, lastLng} = user;
                        const rides = await getRepository(Ride).find({
                            status:"REQUESTING",
                            pickUpLat:Between(lastLat-0.05, lastLat+0.05),
                            pickUpLng:Between(lastLng-0.05, lastLng+0.05)
                        })
                        return{
                            ok:true,
                            error:null,
                            rides
                        }
                    } else {
                        return{
                            ok:false,
                            error:"You are not a driver!",
                            rides:null
                        }
                    }

                }catch(error){
                    return{
                        ok:false,
                        error:error.message,
                        rides:null
                    }
                }

            }
        )
        
    }
}

export default resolvers;