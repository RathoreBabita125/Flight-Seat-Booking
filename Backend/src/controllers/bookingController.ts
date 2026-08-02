import { BookingDetails, BookingResponse, BookingStatus, MyContext, UserRole } from "../datatypes/datatypes";
import { Booking } from "../modules/bookingModule";

export const bookingResolver = {
    Query: {

    },

    Mutation: {
        cancelBooking: async (_: any, bookingData: BookingDetails, context: MyContext): Promise<BookingResponse> => {
            const bookingRepo = context.db.getRepository(Booking);
            try {

                if (!context.user) {
                    throw new Error("You are not logged in. First login to cancel booking.");
                }

                const booking = await bookingRepo.findOne({
                    where: {
                        id: bookingData.id
                    },
                    relations: {
                        user: true,
                        seat: true
                    }
                });

                if (!booking) {
                    throw new Error("Booking Not Found.");
                }

                if (booking.status === BookingStatus.CANCELLED) {
                    throw new Error("This booking is already cancelled.");
                }

                if (context.user.role !== UserRole.ADMIN && context.user.id !== booking?.user?.id) {
                    throw new Error("You can cancel only your own booking.");
                }

                booking.status = BookingStatus.CANCELLED;

                await bookingRepo.save(booking);

                return {
                    message: "Booking has been cancelled successfully."
                }

            } catch (error) {
                throw new Error(`Cancel Booking Failed: ${(error as Error).message}`);
            }
        }
    }
}