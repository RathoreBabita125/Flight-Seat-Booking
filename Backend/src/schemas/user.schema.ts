import gql from 'graphql-tag';

export const userSchema=gql`

    enum UserRole{
        Admin
        Passenger
    }

    enum Gender {
        Male
        Female
        Others
    }

    type User{
        id:ID!
        fullName:String!
        email:String!
        role:UserRole!
        gender:Gender!
        age:Int!
        phone:String!
    }

    type UserResponse{
        message:String
        user:User
        token: String
    }

    type Query{
        getUsers:[User]
    }

    type Mutation{
        register(
            fullName:String!
            email:String!
            password:String!
            gender:Gender!
            age:Int!
            phone:String!
        ):UserResponse

        login(
            email:String!
            password:String!
        ):UserResponse

        logout:UserResponse

        forget(
            email:String!
            newPassword:String!
            confirmPassword:String!
        ):UserResponse

        changePassword(
            oldPassword: String!
            newPassword: String!
        ):UserResponse
    }
`