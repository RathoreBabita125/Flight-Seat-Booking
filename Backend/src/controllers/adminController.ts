import { FindOptionsWhere, ILike } from "typeorm";
import { BookingStatus, MyContext, UserRole } from "../datatypes/datatypes";
import { Booking } from "../modules/bookingModule";
import { User } from "../modules/userModule";

export const adminResolver = {

    Query: {
        getAllUsers: async (_: any, __: any, context: MyContext) => {
            const userRepo = context.db.getRepository(User);
            console.log("Current user: ", context.user)

            if (!context.user) {
                throw new Error("You are not logged in. First login to get info.")
            }
            try {
                if (context.user?.role === UserRole.ADMIN) {
                    const allUsers = await userRepo.find();
                    return allUsers;
                }
                else {
                    throw new Error("Unauthorized access. Only admin can access.");
                }
            } catch (error) {
                throw new Error(`You don't have access to get all users info. ${(error as Error).message}`);
            }
        },

        getAllBookings: async (_: any, { status, search }: { status: BookingStatus, search?: string }, context: MyContext) => {
            const bookingRepo = context.db.getRepository(Booking);
            try {
                if (context.user?.role === UserRole.ADMIN) {
                    const allBookings = bookingRepo
                        .createQueryBuilder("booking")
                        .leftJoinAndSelect("booking.seat", "seat")
                        .leftJoinAndSelect("booking.user", "user");

                    if (status) {
                        allBookings.andWhere("booking.status = :status", {
                            status,
                        });
                    }

                    if (search) {
                        allBookings.andWhere(
                            "(user.fullName ILIKE :search OR seat.seatNumber ILIKE :search)",
                            {
                                search: `%${search}%`,
                            }
                        );
                    }

                    return allBookings.getMany();
                }
                else {
                    throw new Error("Unauthorized access.");
                }
            } catch (error) {
                throw new Error(`You don't have access to know all users bookings. ${(error as Error).message}`);
            }
        },

        // getAllBookings: async (_: any, { status }: { status: BookingStatus }, context: MyContext) => {
        //     const bookingRepo = context.db.getRepository(Booking);
        //     const where: FindOptionsWhere<Booking> = {};

        //     if (status) {
        //         where.status = status;
        //     }

        //     try {
        //         if (context.user?.role === UserRole.ADMIN) {
        //             const allBookings = await bookingRepo.find(
        //                 {
        //                     where,
        //                     relations: {
        //                         seat: true,
        //                         user: true
        //                     }
        //                 }
        //             );
        //             return allBookings;
        //         }
        //         else{
        //             throw new Error("Unauthorized access.");
        //         }
        //     } catch (error) {
        //         throw new Error(`You don't have access to know all users bookings. ${(error as Error).message}`);
        //     }
        // },
    },

    Mutation: {

    }
}