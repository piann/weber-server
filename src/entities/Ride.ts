import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, } from "typeorm";
import {rideStatus} from "../types/types";
import User from "./User";

@Entity()
class Ride extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({"type":"text",
    enum:["ACCEPTED","FINISHED","CANCELED","REQUESTING","ONROUTE"]
    })
    status: rideStatus;
    @Column({"type":"text",
    })
    pickUpAddress:String;
    @Column({"type":"double precision",default:0,})
    pickUpLat:number;
    @Column({"type":"double precision",default:0,})
    pickUpLng:number;
    @Column({"type":"double precision",default:0,})
    dropOffAddress:string;
    @Column({"type":"double precision",default:0,})
    dropOffLat:number;
    @Column({"type":"double precision",default:0,})
    dropOffLng:number;
    @Column({"type":"double precision",default:0,})
    price:number;
    @Column({"type":"text",})
    duration:string;
    @Column({"type":"text",})
    distance:string;
    @ManyToOne(type=>User, user=>user.rideAsPassenger)
    passenger:User;
    @ManyToOne(type=>User, user=>user.rideAsDriver)
    driver:User;    
    @CreateDateColumn()
    createdAt:string;
    @UpdateDateColumn()
    updatedAt:string;

    
}

export default Ride;