import { DataSource } from "typeorm";
import { User } from "../modules/userModule";
import { Booking } from "../modules/bookingModule";
import { Seat } from "../modules/seatModule";

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
    // port: 5432,
    // username: 'postgres',
    // password: "Cel%Bd@2026",
    // database: 'Flight Seat Booking',
    synchronize: true,
    entities: [User, Booking, Seat]
})
