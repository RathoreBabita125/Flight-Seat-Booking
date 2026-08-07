import { BookingDetails, BookingFilter, BookingResponse, BookingSeat, BookingStatus, MyContext, SeatStatus, UserRole } from "../datatypes/datatypes";
import { Booking } from "../modules/bookingModule";
import { Seat } from "../modules/seatModule";
import { User } from "../modules/userModule";

export const passengerResolver = {

    Query: {
        myAllBookings: async (_: any, { filter }: { filter?: BookingFilter }, context: MyContext) => {
            const bookingRepo = context.db.getRepository(Booking);
            try {
                if (context.user?.role === UserRole.PASSENGER) {
                    const myBookings = await bookingRepo
                        .createQueryBuilder("booking")
                        .leftJoinAndSelect("booking.seat", "seat")
                        .leftJoinAndSelect("booking.user", "user")
                        .where("booking.user = :user", {
                            user: context.user.id,
                        }
                    )

                    if (filter?.seatNumber) {
                        myBookings.andWhere("seat.seatNumber ILIKE :seatNumber", {
                            seatNumber: `%${filter.seatNumber}%`,
                        });
                    }

                    if (filter?.status) {
                        myBookings.andWhere("booking.status = :status", {
                            status: filter.status,
                        });
                    }

                    return myBookings.getMany();
                }
                else {
                    throw new Error("Unauthorized access.");
                }
            } catch (error) {
                throw new Error(`You don't have access to know all users bookings. ${(error as Error).message}`);
            }
        }
    },

    Mutation: {
        bookingSeat: async (_: any, bookingData: BookingSeat, context: MyContext): Promise<BookingResponse> => {
            const bookRepo = context.db.getRepository(Booking);
            const seatRepo = context.db.getRepository(Seat);
            const userRepo = context.db.getRepository(User);

            console.log("booking data", bookingData)

            try {
                if (!context.user) {
                    throw new Error("You are not logged in. First login to book seat.");
                }

                if (context.user.role === UserRole.ADMIN) {
                    throw new Error("You can not book seat for passenger. Only passenger can book their own seat.");
                }

                const user = await userRepo.findOne({
                    where: {
                        id: context.user.id
                    }
                });

                if (!user) {
                    throw new Error("User does not exist.");
                }

                const seat = await seatRepo.findOne({
                    where: {
                        id: bookingData.seat
                    }
                });

                if (!seat) {
                    throw new Error("This seat does not exist.")
                }

                if (seat.status === SeatStatus.BOOKED) {
                    throw new Error("This seat is already booked.");
                }

                seat.status = SeatStatus.BOOKED;

                const savedSeat = await seatRepo.save(seat);

                const newBooking = bookRepo.create({
                    status: BookingStatus.CONFIRMED,
                    seat: savedSeat,
                    user: user
                })

                await bookRepo.save(newBooking);

                return {
                    message: "The seat has been booked successfully."
                }

            } catch (error) {
                throw new Error(`Booking Failed: ${(error as Error).message}`);
            }
        },
    }
}