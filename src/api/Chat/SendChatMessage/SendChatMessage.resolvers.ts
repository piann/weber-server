import {Resolvers} from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import Chat from "../../../entities/Chat";
import { SendChatMessageMutationArgs, SendChatMessageResponse } from "src/types/graph";
import Message from "../../../entities/Message";


const resolvers:Resolvers={
    Mutation:{
        SendChatMessage: privateResolver(
        async(_,args:SendChatMessageMutationArgs,{req}):Promise<SendChatMessageResponse> =>{
            try{
            const user:User = req.user;
            const text = args.text;
            const chat = await Chat.findOne(args.chatId);
            if(chat){
                if(chat.driverId === user.id || chat.passengerId === user.id){
                    const message = await Message.create({
                        text,
                        chat,
                        user
                    });
                    return{
                        ok:true,
                        error:null,
                        message
                    }
                } else {
                    return{
                        ok:false,
                        error:"Not Authorized",
                        message:null,
                    }
                }

            } else{
                return{
                    ok:false,
                    error:"Can't find chat",
                    message:null,
                }
            }
            } catch(error){
                return{
                    ok:false,
                    error:error.message,
                    message:null,
                }
            }
        }
        )
    }
};

export default resolvers;