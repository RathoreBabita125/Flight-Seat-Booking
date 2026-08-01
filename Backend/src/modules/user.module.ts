import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { GenderType, UserRole } from "../datatypes/datatypes";
import { Booking } from "./booking.module";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ type: 'text' })
    fullName!: string;

    @Column({ type: 'text', unique: true })
    email!: string;

    @Column({ type: 'text', select: false })
    password!: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.PASSENGER })
    role!: UserRole;

    @Column({ type: 'enum', enum: GenderType })
    gender!: GenderType;

    @Column({ type: 'text', unique: true })
    phone!: string;

    @Column({ type: 'int' })
    age!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => Booking, (booking) => booking.user)
    bookings!: Booking[];
}