import bcrypt from "bcrypt-nodejs";
import {IsEmail,} from "class-validator";
import {ManyToOne, BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, OneToMany} from "typeorm";
import Chat from "./Chat";
import Message from "./Message";
import Verification from "./Verification";
import Ride from "./Ride";
const BCRYPT_ROUNDS = 10;

@Entity()
class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({type:"text", unique:true})
    @IsEmail()
    email:string;

    @Column({type:"boolean", default:false})
    verifiedEmail:boolean;

    @Column({type:"text"})
    firstName: string;

    @Column({type:"text"})
    lastName: string;

    @Column({type:"int"})
    age: number;

    @Column({type:"text"})
    password:string;

    @Column({type:"text"})
    phoneNumber: string;

    @Column({type:"boolean", default:false})
    verifiedPhoneNumber: boolean;

    @Column({type:"text"})
    profilePhoto;

    @Column({type:"boolean", default:false})
    isDriving: boolean;
    
    @Column({type:"boolean", default:false})
    isRiding: boolean;
    
    @Column({type:"boolean", default:false})
    isTaken: boolean;
    @Column({type:"double precision", default:0})
    lastLng: number;
    @Column({type:"double precision", default:0})
    lastLat: number;
    @Column({type:"double precision", default:0})   
    lastOrientation: number
    @ManyToOne(type=>Chat, chat=>chat.participants)
    chat:Chat;
    @OneToMany(type => Message, message => message.user)
    messages:Message[]
    @OneToMany(type => Verification, verification=>verification.user)
    verifications: Verification[];
    @OneToMany(type => Ride, ride => ride.passenger)
    rideAsPassenger: Ride[];
    @OneToMany(type => Ride, ride => ride.driver)
    rideAsDriver: Ride[];


    @CreateDateColumn() createdAt: string;
    @UpdateDateColumn() updateAy: string;

    get fullName(): string{
        return `${this.firstName} ${this.lastName}`;
    };

    private hashPassword(password:string): Promise<string>{
        return bcrypt.hash(password, BCRYPT_ROUNDS);
    }

    @BeforeInsert()
    @BeforeUpdate()
    async savePassword(): Promise<void> {
        if(this.password){
            const hashedPassword = await this.hashPassword(this.password);
            this.password = hashedPassword;
        }
    }

    public comparePassword(password:string):Promise<boolean> {
        return bcrypt.compare(password, this,password)
    }
}

export default User;