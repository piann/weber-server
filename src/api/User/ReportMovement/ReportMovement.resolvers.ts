import {Resolvers} from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {ReportMovementMutationArgs, ReportMovementResponse}  from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArgs";
import User from "../../../entities/User";

const resolvers:Resolvers ={
    Mutation:{
        ReportMovement: privateResolver(
            async(_, args:ReportMovementMutationArgs ,{req}):Promise<ReportMovementResponse> =>{
                const user = req.user;
                const nonNullInfo = cleanNullArgs(args);
                try{
                    await User.update({id:user.id}, {...nonNullInfo});
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