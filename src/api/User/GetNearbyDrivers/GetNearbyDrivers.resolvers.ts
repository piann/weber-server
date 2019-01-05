import {Resolvers} from "../../../types/resolvers";
import { GetNearbyDriversResponse } from "src/types/graph";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import { Between, getRepository } from "typeorm";

const resolvers: Resolvers = {
    Query:{
        GetNearbyDrivers: privateResolver(
            async(_,__,{req}):Promise<GetNearbyDriversResponse> => {
                const user:User = req.user;
                const {lastLat, lastLng} = user;
                try{
                    if(user){
                        const drivers:User[] = await getRepository(User).find({ // this is data mapper pattern
                            isDriving:true,
                            lastLat:Between(lastLat-0.05,lastLat+0.05),
                            lastLng:Between(lastLng-0.05,lastLng+0.05),
                        });
                        if(drivers){
                            return{
                                ok:true,
                                error:null,
                                drivers
                            }
                        } else {
                            return {
                                ok:false,
                                error:"Can't find nearby drivers",
                                drivers:null,
                            }
                        }
                        
                    } else {
                        return {
                            ok:false,
                            error:"Can't find valid user",
                            drivers:null,
                        }
                    }
                    
                    
                }catch(error){
                    return {
                        ok:false,
                        error:error.message,
                        drivers:null,
                    }
                }
            }
        )
    }
}

export default resolvers;