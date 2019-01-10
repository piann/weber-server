import {Resolvers} from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {GetChatQueryArgs, GetChatResponse} from "../../../types/graph";
import User from "../../../entities/User";
import Chat from "../../../entities/Chat";

const resolvers:Resolvers={
        Query:{
            GetChat:privateResolver(
                async(_,args:GetChatQueryArgs,{req}):Promise<GetChatResponse> =>{
                    try{
                        const user:User = req.user;
                        const chat = await Chat.findOne({id:args.chatId},{relations:['passenger','driver','messages']})
                        if(chat){
                            if(chat.passengerId===user.id || chat.driverId===user.id){
                                return{
                                    ok:true,
                                    error:null,
                                    chat
                                }
                            } else {
                                return{
                                    ok:false,
                                    error:"Not Authorized User",
                                    chat:null
                                }
                            }
                        } else {
                            return{
                                ok:false,
                                error:"Can't find chat",
                                chat:null
                            }
                        }
                    
                    } catch(error) {
                        return{
                            ok:false,
                            error:error.message,
                            chat:null
                        }
                    }
                }
            )
        }
}

export default resolvers;