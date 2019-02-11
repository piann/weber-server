import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import {
  UpdateRideStatusMutationArgs,
  UpdateRideStatusResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import Chat from "../../../entities/Chat";

const resolvers: Resolvers = {
  Mutation: {
    UpdateRideStatus: privateResolver(
      async (
        _,
        args: UpdateRideStatusMutationArgs,
        { req, pubSub}
      ): Promise<UpdateRideStatusResponse> => {
        
        const user: User = req.user;
        if (user.isDriving) {
          try {
            let ride: Ride | undefined;
            if (args.status === "ACCEPTED") {
              ride = await Ride.findOne(
                {
                  id: args.rideId,
                  status: "REQUESTING"
                },{relations:["passenger", "driver"]}
                );
              if (ride) {
                ride.driver = user;
                User.update({id:user.id},{isTaken:true})
                const chat = await Chat.create({
                  driver:user,
                  passenger:ride.passenger
                }).save();
                ride.chat = chat;
                ride.save();
              }
            } else {
              ride = await Ride.findOne({
                id: args.rideId,
                driver: user
              });
            }
            if (ride) {
              ride.status = args.status;
              ride.save();
              pubSub.publish("rideUpdate", { RideStatusSubscription:ride})
             
              return {
                ok: true,
                error: null,
                rideId:ride.id
              };
            } else {
              return {
                ok: false,
                error: "Cant update ride",
                rideId:null
              };
            }
          } catch (error) {
            return {
              ok: false,
              error: error.message,
              rideId:null
            };
          }
        } else {
          return {
            ok: false,
            error: "You are not driving",
            rideId:null
          };
        }
      }
    )
  }
};
export default resolvers;