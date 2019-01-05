import {Resolvers} from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { DeletePlaceMutationArgs, DeletePlaceResponse } from "src/types/graph";
import Place from "../../../entities/Place";

const resolvers: Resolvers={
    Mutation:{
        DeletePlace: privateResolver(
            async(_,args:DeletePlaceMutationArgs,{req}):Promise<DeletePlaceResponse> =>{
                try{
                    const user = req.user;
                    const placeId = args.placeId;
                    const place = await Place.findOne({id:placeId});
                    if(user && place){
                        if(place.userId === user.id){
                            await Place.delete({id:placeId});

                            return{
                                ok:true,
                                error:null
                            }
                        } else {
                            return {
                                ok:false,
                                error: "Not Authorized"
                            }
                        } 
                    } else {
                        return {
                            ok:false,
                            error: "Can't find valid user of placeId"
                        }
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