import {Resolvers} from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { EditPlaceMutationArgs, EditPlaceResponse } from "src/types/graph";
import User from "../../../entities/User";
import Place from "../../../entities/Place";
import cleanNullArgs from "../../../utils/cleanNullArgs";

const resolvers:Resolvers ={
    Mutation:{
        EditPlace:privateResolver(
            async(_,args:EditPlaceMutationArgs,{req}):Promise<EditPlaceResponse>=>{
                const user:User = req.user;
                const placeId = args.placeId;
                try{
                    if(user){
                        const place = await Place.findOne({id:placeId});
                        if(place){
                            if(place.userId === user.id){
                                const nonNullInfo = cleanNullArgs(args);
                                await Place.update({id:placeId},{...nonNullInfo});
                                return{
                                    ok:true,
                                    error:null
                                }
                            } else {
                                return{
                                    ok:false,
                                    error:"Not Authorized"
                                }
                            }
                        }else{
                            return{
                                ok:false,
                                error: "Place not found"
                            }
                        }
                    }else{
                        return{
                            ok:false,
                            error:"Can't get valid user"
                        };
                    }
                } catch(error) {
                    return {
                        ok:false,
                        error:error.message
                    }
                }
            }
        )
    }
}

export default resolvers;