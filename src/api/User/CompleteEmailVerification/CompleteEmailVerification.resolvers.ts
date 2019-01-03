import {Resolvers} from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import { CompleteEmailVerificationMutationArgs, CompleteEmailVerificationResponse } from "src/types/graph";
import Verification from "../../../entities/Verification";


const resolvers: Resolvers = {
    Mutation:{
        CompleteEmailVerification: privateResolver(
            async(_,args:CompleteEmailVerificationMutationArgs,{req}):Promise<CompleteEmailVerificationResponse> =>{
                const user: User = req.user;
                const {key} = args; 
                if(user.email){
                    try{
                        const verification = await Verification.findOne({key, payload:user.email});
                        if(verification){
                            //user.verifiedEmail=true;
                            //user.save(); // this way of updating has problem of double-hashing password
                             
                            delete user.updateAt // updateAt is automatically added, so is should be excluded preventing multiple assignments to same column
                            console.log("!!!!!!!!!!!!!!!!!!!USERINFO!!!!!!!!!!!!!!")
                            console.log(user);
                            await User.update({id:user.id},{...user, verifiedEmail:true});
                            return{
                                ok:true,
                                error:null
                            }
                        } else {
                            return{
                            ok:false,
                            error: "Can't verify Email"
                            }
                        }

                    } catch(error){
                    return{
                        ok:false,
                        error:error.message
                    }
                }
                } else {
                    return {
                        ok:false,
                        error: "No email to verify"
                    };
                }
            }
        )
    }
};

export default resolvers;