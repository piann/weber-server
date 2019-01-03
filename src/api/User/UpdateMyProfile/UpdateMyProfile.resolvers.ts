import {Resolvers} from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {UpdateMyProfileResponse, UpdateMyProfileMutationArgs} from "../../../types/graph"
import User from "../../../entities/User";
import cleanNullArgs from "../../../utils/cleanNullArgs";

const resolvers: Resolvers = {
    Mutation: {
        UpdateMyProfile: privateResolver(
            async(_, args:UpdateMyProfileMutationArgs, {req}):Promise<UpdateMyProfileResponse> => {
                const {user} = req.user;
                if(user){
                    let nonNullInfo:any = cleanNullArgs(args);
                    
                    try{
                    if(args.password !== null){// !!!!! beforeInsert는 userInstance가 직접 업데이트될때만 요청되기 때문에, 이 부분을 따로 처리하지 않으면 password hash가 일어나지 않을 수 있다.
                        user.password = args.password;
                        await user.save();
                        delete nonNullInfo.password;
                    }
                    await User.update({id:user.id},{...nonNullInfo})
                    return {
                        ok:true,
                        error:null
                    }
                    }catch(error){
                        return{
                            ok:true,
                            error:error.message
                        }
                    }
                } else {
                    return {
                        ok:false,
                        error:"There is no such user"
                    }
                }

            }
        )
    }
}

export default resolvers;