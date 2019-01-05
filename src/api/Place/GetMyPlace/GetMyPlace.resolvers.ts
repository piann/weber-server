import {Resolvers} from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
//import Place from "../../../entities/Place";
import User from "../../../entities/User";
import { GetMyPlaceResponse } from "src/types/graph";

const resolvers: Resolvers={
    Query:{
        GetMyPlace:privateResolver(
            async(_,__,{req}):Promise<GetMyPlaceResponse>=>{
                const user = await User.findOne({id:req.user.id},{relations:["places"]});
                try{
                    if(user){
                        return{
                            ok:true,
                            error:null,
                            places:user.places
                        }
                    } else {
                        return {
                            ok:false,
                            error:"Can't find valid user",
                            places:null
                        }
                    }
                } catch(error){
                    return {
                        ok:false,
                        error:error.message,
                        places:null
                    }
                }
            }
        )
    }
}
export default resolvers;