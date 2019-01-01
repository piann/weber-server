import {Resolvers} from "../../../types/resolvers";

const resolvers: Resolvers = {
    Query:{
        GetMyProfile: async (_,__,{req}) =>{
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
    }
    }
};

export default resolvers;
