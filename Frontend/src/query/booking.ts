import { gql } from "@apollo/client";

export const GET_ALL_BOOKINGS = gql`
  query GetAllBookings($filter: BookingFilterInput){
    getAllBookings(filter:$filter){
      id
      status
      createdAt
      user {
        id
        fullName
        email
        gender
        age
        phone
      }
      seat {
        id
        seatNumber
        status
      }
    }
  }
`;

export const MY_BOOKING = gql`
  query GetMyBookings($filter: BookingFilterInput){
    myAllBookings(filter:$filter){
      id
      status
      createdAt
      user {
        id
        fullName
        email
        gender
        age
        phone
      }
      seat {
        id
        seatNumber
        status
      }
    }
  }
`;

export const BOOK_SEAT=gql`
  mutation BookingSeat(
    $seat:ID
  ){
    bookingSeat(
      seat:$seat
    ){
      message
    }
  }
`;

export const CANCEL_BOOKING = gql`
  mutation CancelBooking($id: ID!) {
    cancelBooking(id: $id) {
      message
    }
  }
`;

export const AUTO_ASSIGN_SEAT = gql`
  mutation AutoAssignSeat {
    autoAssignSeat {
      message
    }
  }
`;


export const RESET_ALL_BOOKING = gql`
  mutation ResetAllBooking {
    resetAllBooking {
      message
    }
  }
`;

