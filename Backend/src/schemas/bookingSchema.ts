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

    input BookingFilterInput {
        status:BookingStatus
        fullName:String
        gender:Gender
        seatNumber:String
        search:String
    }

    type Query {
        getAllBookings(
            filter: BookingFilterInput  
        ):[Booking]

        myAllBookings(
            filter: BookingFilterInput  
        ):[Booking]
    }
    
    type Mutation{

        bookingSeat(
            seat:ID
        ):BookingResponse

        cancelBooking(
            id:ID
        ):BookingResponse

        autoAssignSeat:BookingResponse

        resetAllBooking:BookingResponse
    }
`