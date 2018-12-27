import {Resolvers} from "../../../types/resolvers";
import { FacebookConnectMutationArgs, FacebookConnectResponse } from "src/types/graph";
import User from "../../../entities/User";

const resolvers:Resolvers = {
    Mutation:{
        FacebookConnect:async (_, args:FacebookConnectMutationArgs):Promise<FacebookConnectResponse> =>{
            try{
                const {fbId} = args;
                const existingUser = await User.findOne({fbId:fbId})
                if(existingUser){
                    return{
                        ok:true,
                        error:null,
                        token:"Coming soon.(Already exist)"
                    }
                }
            } catch(error){
                return {
                    ok:false,
                    error:error.message ,
                    token:null,
                }
            }
            try{
                const {fbId} = args;
                await User.create({...args, profilePhoto:`http://graph.facebook.com/${fbId}/picture?type=square`}).save();

                
                    return{
                        ok:true,
                        error:null,
                        token:"Comming soon.(New User Create)"
                    }
                

            }catch(error){
                return {
                    ok:false,
                    error:error.message ,
                    token:null,
                }
            }
        }
    
}
}
export default resolvers;