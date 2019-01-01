import {Resolvers} from "../../../types/resolvers";
import privateResolver, {} from "../../../utils/privateResolver";


const resolvers: Resolvers = {
    Query:{
        GetMyProfile: privateResolver((_,__,{req}) =>{
            try{
            const {user} = req;
            return {
                ok:true,
                error:null,
                user
            }
        }
         catch (error) {
            return {
                ok:false,
                error: "Can't get user information",
                user:null
            }
        }
    })
    }
};

export default resolvers;
