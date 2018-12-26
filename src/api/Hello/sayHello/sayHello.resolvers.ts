import {SayHelloQueryArgs, SayHelloResponse} from "../../../types/graph";

const resolvers = {
    Query:{
        sayHello: (_, args:SayHelloQueryArgs):SayHelloResponse => {
            return{
                text:`Ello ${args.name}`,
                error:false,
            }
        }
    }
};

export default resolvers;