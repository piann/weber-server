import {Greeting} from "../../../types/graph";

const resolvers = {
    Query:{
        sayHello: ():Greeting => {
            return{
                text:"love ya",
                error:false,
            }
        }
    }
};

export default resolvers;