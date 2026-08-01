import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.module";
import { Seat } from "./seat.module";
import { BookingStatus } from "../datatypes/datatypes";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: "enum", enum: BookingStatus, default: BookingStatus.CONFIRMED })
    status!: BookingStatus;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @ManyToOne(() => User, (user) => user.bookings)
    user!: User

    @ManyToOne(() => Seat, (seat) => seat.bookings)
    seat!: Seat;
}