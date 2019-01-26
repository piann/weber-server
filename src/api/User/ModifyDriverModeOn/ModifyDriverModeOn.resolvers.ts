import {Resolvers} from "../../../types/resolvers";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateResolver";
import { ModifyDriverModeOnResponse, ModifyDriverModeOnMutationArgs } from "src/types/graph";

const resolvers: Resolvers = {
    Mutation:{
        ModifyDriverModeOn: privateResolver(
            async(_,args:ModifyDriverModeOnMutationArgs,{req}):Promise<ModifyDriverModeOnResponse>=>{
                const user:User = req.user;
                if(user){
                    try{
                        delete user.updatedAt // updatedAt is automatically added, so is should be excluded preventing multiple assignments to same column
                        await User.update({id:user.id},{...user, driverModeOn:args.driverModeOn});
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