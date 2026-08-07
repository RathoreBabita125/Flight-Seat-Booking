import { gql } from '@apollo/client';

export const GET_ME = gql`
    query GetMe {
        getMe {
            id
            fullName
            email
            role
            age
            gender
            phone
        }
    }
`;

export const GET_USERS = gql`
  query GetAllUsers (
    $filter: UserFilterInput
  ){
    getAllUsers(
        filter: $filter
    ){
      id
      fullName
      email
      gender
      age
      phone
      role
      createdAt
    }
  }
`;

export const SIGNUP = gql`
    mutation Register(
        $fullName: String!
        $email: String!
        $password: String!
        $gender: Gender!
        $age: Int!
        $phone: String!
    ) {
    register(
        fullName: $fullName
        email: $email
        password: $password
        gender: $gender
        age: $age
        phone: $phone
    ) {
        message
        user {
            id
            fullName
            email
            gender
            age
            phone
        }
        token
    }
}
`;

export const LOGIN = gql`
    mutation Login(
        $email: String!
        $password: String!
    ) {
        login(
            email: $email
            password: $password
        ) {
            message
            user {
                id
                fullName
                email
                phone
                age
                gender
            }
        }
    }
`;

export const FORGET_PASSWORD = gql`
    mutation ForgetPassword(
        $email: String!
        $newPassword: String!
        $confirmPassword: String!
    ) {
        forget(
            email: $email
            newPassword: $newPassword
            confirmPassword: $confirmPassword
        ) {
            message
        }
    }
`;

export const CHANGE_PASSWORD = gql`
    mutation ChangePassword(
        $oldPassword: String!
        $newPassword: String!
    ) {
        changePassword(
            oldPassword: $oldPassword
            newPassword: $newPassword
        ) {
            message
        }
    }
`;

export const LOGOUT=gql`
    mutation Logout{
        logout{
            message
        }
    }
`