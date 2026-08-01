import { DataSource } from "typeorm";
import { User } from "../modules/user.module";
import { Booking } from "../modules/booking.module";
import { Seat } from "../modules/seat.module";

export const AppDataSource=new DataSource({
    type:'postgres',
    port:5432,
    username:'postgres',
    password:"Cel%Bd@2026",
    database:'Flight Seat Booking',
    synchronize:true,
    entities:[User, Booking, Seat]
})