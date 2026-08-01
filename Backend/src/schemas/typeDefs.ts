import gql from 'graphql-tag'
import { userSchema } from './user.schema'

export const typeDefs=gql`
    scalar Date
    ${userSchema}
`