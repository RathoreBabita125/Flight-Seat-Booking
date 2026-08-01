import { userResolver } from "./user.controller"

export const resolvers={
    Query:{
       
    },
    Mutation:{
        ...userResolver.Mutation,
    }
}