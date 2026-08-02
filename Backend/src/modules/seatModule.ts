import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SeatStatus } from "../datatypes/datatypes";
import { Booking } from "./bookingModule";

@Entity()
export class Seat {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", unique: true })
  seatNumber!: string; 

  @Column({ type: "enum", enum: SeatStatus, default: SeatStatus.AVAILABLE })
  status!: SeatStatus;

  @OneToMany(() => Booking, (booking) => booking.seat)
  bookings!: Booking[];
}