import { BookingDetails, BookingResponse, BookingStatus, MyContext, SeatStatus, UserRole } from "../datatypes/datatypes";
import { Booking } from "../modules/bookingModule";
import { Seat } from "../modules/seatModule";
import { User } from "../modules/userModule";

export const bookingResolver = {
    Query: {

    },

    Mutation: {
        autoAssignSeat:async(_: any, bookingData: BookingDetails, context: MyContext): Promise<BookingResponse>=>{
            const bookRepo=context.db.getRepository(Booking);
            const seatRepo=context.db.getRepository(Seat);
            const userRepo=context.db.getRepository(User);

            console.log("In auto booking", context.user);
            
            try {

                if(!context.user){
                    throw new Error("You are not logged in. Please first login.");
                }

                const user=await userRepo.findOne({
                    where:{
                        id:context.user.id
                    }
                });

                if(!user){
                    throw new Error("User not found.");
                }

                const availableSeat=await seatRepo.findOne({
                   where:{
                    status:SeatStatus.AVAILABLE
                   },
                   order:{
                    seatNumber:"ASC"
                   }
                });

                if(!availableSeat){
                    throw new Error("Sorry currently all seats are booked. Please try later");
                }

                availableSeat.status=SeatStatus.BOOKED;

                const savedSeat=await seatRepo.save(availableSeat);

                const newBooking=bookRepo.create({
                    status:BookingStatus.CONFIRMED,
                    seat:savedSeat,
                    user:user
                });

                const savedBooking = await bookRepo.save(newBooking);

                return {
                    message: "The auto seat has been assigned successfully.",
                    bookings:savedBooking
                }

            } catch (error) {
                throw new Error(`Auto assign Booking Failed: ${(error as Error).message}`);
            }
        },

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