import { adminResolver } from "./adminController"
import { bookingResolver } from "./bookingController"
import { passengerResolver } from "./passengerController"
import { userResolver } from "./userController"

export const resolvers={
    Query:{
        ...userResolver.Query,
        ...adminResolver.Query,
    },
    Mutation:{
        ...userResolver.Mutation,
        ...adminResolver.Mutation,
        ...passengerResolver.Mutation,
        ...bookingResolver.Mutation,
    }
}