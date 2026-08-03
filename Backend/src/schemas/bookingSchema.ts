import gql from 'graphql-tag';

export const bookingSchema=gql`

    enum BookingStatus {
        Confirmed
        Cancelled
    }

    type Booking {
        id:ID!
        status:BookingStatus!
        createdAt:String!
        user:User!
        seat:Seat!
    }

    type BookingResponse{
        message:String
        bookings:Booking
    }

    type Query {
        getAllBookings(
            status:BookingStatus
            search:String
        ):[Booking]
    }
    
    type Mutation{

        bookingSeat(
            status:BookingStatus
            seat:ID
            user:ID
        ):BookingResponse

        cancelBooking(
            id:ID
            status:BookingStatus
        ):BookingResponse

        autoAssignSeat:BookingResponse

        resetAllBooking:BookingResponse
    }
`