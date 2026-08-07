import gql from 'graphql-tag';

export const seatSchema=gql`

    enum SeatStatus{
        Available
        Booked
        All
    }

    type Seat{
        id:ID!
        seatNumber:String!
        status:SeatStatus
        bookings:ID!
    }

    type Query{
        getAllSeats(
            status:SeatStatus
            seatNumber: String
        ):[Seat]
    }

`