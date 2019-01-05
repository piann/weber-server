import {Resolvers} from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {ReportMovementMutationArgs, ReportMovementResponse}  from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArgs";
import User from "../../../entities/User";

const resolvers:Resolvers ={
    Mutation:{
        ReportMovement: privateResolver(
            async(_, args:ReportMovementMutationArgs ,{req,pubSub}):Promise<ReportMovementResponse> =>{
                const user = req.user;
                const nonNullInfo = cleanNullArgs(args);
                try{
                    await User.update({id:user.id}, {...nonNullInfo});
                    pubSub.publish("driverUpdate", {DriversSubscription:user}); // args : channel name, payload(must be same name in scheme(graphql)) 
                    return{
                        ok:true,
                        error:null
                    }
                } catch(error){
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