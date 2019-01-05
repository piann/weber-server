import {Resolvers} from "../../../types/resolvers";
import User from "../../../entities/User";
import privateResolver from "../../../utils/privateResolver";
import { ToggleDrivingModeResponse } from "src/types/graph";

const resolvers: Resolvers = {
    Mutation:{
        ToggleDrivingMode: privateResolver(
            async(_,__,{req}):Promise<ToggleDrivingModeResponse> =>{
                const user:User = req.user;
                //user.isDriving = !user.isDriving;
                //user.save();
                try{
                delete user.updatedAt // updatedAt is automatically added, so is should be excluded preventing multiple assignments to same column
                await User.update({id:user.id},{...user, isDriving:!user.isDriving});
                return{
                    ok:true,
                    error:null
                }
                } catch(error) {
                    return{
                    ok:false,
                    error:error.message
                    }
                }   
            }
        )
    }
}

export default resolvers;