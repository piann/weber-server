import {Resolvers} from "../../../types/resolvers";
import { FacebookConnectMutationArgs, FacebookConnectResponse } from "src/types/graph";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";

const resolvers:Resolvers = {
    Mutation:{
        FacebookConnect:async (_, args:FacebookConnectMutationArgs):Promise<FacebookConnectResponse> =>{
            try{
                const {fbId} = args;
                const existingUser = await User.findOne({fbId:fbId})
                if(existingUser){
                    const token = createJWT(existingUser.id)
                    return{
                        ok:true,
                        error:null,
                        token
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
                const newUser = await User.create({...args, profilePhoto:`http://graph.facebook.com/${fbId}/picture?type=square`}).save();
                const token = createJWT(newUser.id)
                
                    return{
                        ok:true,
                        error:null,
                        token
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