import { gql } from '@apollo/client';

export const GET_ALL_SEATS = gql`
  query GetAllSeats($status: SeatStatus, $seatNumber: String) {
    getAllSeats(status: $status, seatNumber:$seatNumber) {
      id
      seatNumber
      status
    }
  }
`;



