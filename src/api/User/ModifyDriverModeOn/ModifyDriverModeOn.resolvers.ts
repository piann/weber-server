import {Resolvers} from "../../../types/resolvers";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateResolver";
import { ModifyDrivingStatusMutationArgs, ModifyDrivingStatusResponse } from "src/types/graph";

const resolvers: Resolvers = {
    Mutation:{
        ModifyDrivingStatus: privateResolver(
            async(_,args:ModifyDrivingStatusMutationArgs,{req}):Promise<ModifyDrivingStatusResponse>=>{
                const user:User = req.user;
                if(user){
                    try{
                        
                        let {driverModeOn, isDriving} = user;
                        if(args.isDriving !== undefined){
                            if(args.isDriving !== null){
                                isDriving = args.isDriving;
                            }
                        }
                        if(args.driverModeOn !== undefined){
                            if(args.driverModeOn !== null){
                                driverModeOn = args.driverModeOn;
                            }
                        }
                        console.log(driverModeOn)
                        delete user.updatedAt // updatedAt is automatically added, so is should be excluded preventing multiple assignments to same column
                        await User.update({id:user.id},{...user, driverModeOn, isDriving});
                        return{
                            ok:true,
                            error:null
                        }
                    }catch(error){
                        return{
                            ok:false,
                            error:error.message
                        }
                    }
                } else {
                    return {
                        ok:false,
                        error:"There is no such user"
                    }
                }
            }
        )
    }
}

export default resolvers;