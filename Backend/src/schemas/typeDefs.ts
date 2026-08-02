import gql from 'graphql-tag'
import { userSchema } from './userSchema'
import { bookingSchema } from './bookingSchema'
import { seatSchema } from './seatSchema'

export const typeDefs=gql`
    scalar Date
    ${userSchema}
    ${bookingSchema}
    ${seatSchema}
`