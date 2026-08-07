import { BookingDetails, BookingFilter, BookingResponse, BookingStatus, GenderType, MyContext, SeatStatus, userFilterProps, UserRole } from "../datatypes/datatypes";
import { Booking } from "../modules/bookingModule";
import { Seat } from "../modules/seatModule";
import { User } from "../modules/userModule";

export const adminResolver = {

    Query: {
        getAllUsers: async (_: any, args: { filter?: { fullName?: string; gender?: string; } }, context: MyContext) => {
            const userRepo = context.db.getRepository(User);
            try {

                if (!context.user) {
                    throw new Error("You are not logged in. First login to get info.");
                }
                if (context.user?.role !== UserRole.ADMIN) {
                    throw new Error("Unauthorized access. Only admin can access.");
                }

                const { filter } = args;
                const query = userRepo.createQueryBuilder("user").take(10).skip(0);

                if (filter?.fullName) {
                    query.andWhere("user.fullName ILIKE :fullName", {
                        fullName: `%${filter.fullName}%`,
                    });
                }

                if (filter?.gender) {
                    query.andWhere("user.gender = :gender", {
                        gender: filter.gender,
                    });
                }

                const allUsers = await query.getMany();
                return allUsers;

            } catch (error) {
                throw new Error(`You don't have access to get all users info. ${(error as Error).message}`);
            }
        },

        getAllBookings: async (_: any,  { filter }: { filter?: BookingFilter }, context: MyContext) => {
            const bookingRepo = context.db.getRepository(Booking);
            try {
                if (context.user?.role === UserRole.ADMIN) {
                    const allBookings = bookingRepo
                        .createQueryBuilder("booking")
                        .leftJoinAndSelect("booking.seat", "seat")
                        .leftJoinAndSelect("booking.user", "user");

                    if (filter?.status) {
                        allBookings.andWhere("booking.status = :status", {  
                            status: filter.status,
                        });
                    }

                    if (filter?.fullName) {
                        allBookings.andWhere("user.fullName ILIKE :fullName", {
                            fullName: `%${filter.fullName}%`,
                        });
                    }

                    if (filter?.gender) {
                        allBookings.andWhere("user.gender ILIKE :gender", {
                            fullName: `%${filter.gender}%`,
                        });
                    }

                    if (filter?.seatNumber) {
                        allBookings.andWhere("seat.seatNumber ILIKE :seatNumber", {
                            seatNumber: `%${filter.seatNumber}%`,
                        });
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
    },

    Mutation: {
        resetAllBooking: async (_: any, bookingData: BookingDetails, context: MyContext): Promise<BookingResponse> => {
            const bookingRepo = context.db.getRepository(Booking);
            const seatRepo = context.db.getRepository(Seat);

            try {

                if (!context.user) {
                    throw new Error("You are not logged in. Please first login.");
                }

                if (context.user.role !== UserRole.ADMIN) {
                    throw new Error("You are not allowed to reset all bookings.");
                }

                await seatRepo.update(
                    {
                        status: SeatStatus.BOOKED
                    },
                    {
                        status: SeatStatus.AVAILABLE
                    }
                );

                const savedBooking = await bookingRepo.update(
                    {
                        status: BookingStatus.CONFIRMED
                    },
                    {
                        status: BookingStatus.CANCELLED
                    }
                );

                return {
                    message: "All booking has been reset successfully.",
                }

            } catch (error) {
                throw new Error(`Reset booking failed: ${(error as Error).message}`);
            }
        },
    }
}