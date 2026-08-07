import { adminResolver } from "./adminController"
import { bookingResolver } from "./bookingController"
import { passengerResolver } from "./passengerController"
import { seatResolver } from "./seatController"
import { userResolver } from "./userController"

export const resolvers={
    Query:{
        ...userResolver.Query,
        ...adminResolver.Query,
        ...seatResolver.Query,
        ...passengerResolver.Query,
    },
    Mutation:{
        ...userResolver.Mutation,
        ...adminResolver.Mutation,
        ...passengerResolver.Mutation,
        ...bookingResolver.Mutation,
    },
}