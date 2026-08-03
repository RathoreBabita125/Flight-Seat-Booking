import { BookingDetails, BookingResponse, BookingStatus, MyContext, SeatStatus, UserRole } from "../datatypes/datatypes";
import { Booking } from "../modules/bookingModule";
import { Seat } from "../modules/seatModule";
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
                        status:SeatStatus.BOOKED
                    },
                    {
                        status: SeatStatus.AVAILABLE
                    }
                );

                const savedBooking=await bookingRepo.update(
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