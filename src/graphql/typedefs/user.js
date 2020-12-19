import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    authenticateUser(username: String!, password: String!): AuthResp!
    authUserProfile: User! @isAuth
    getAllUsers: [User!]!
    getUserId(id: ID!): User!
  }

  extend type Mutation {
    registerUser(newUser: UserInput!): AuthResp!
    deleteUserById(id: ID!): UserNatification! @isAuth
  }

  input UserInput {
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    avatarImage: String
  }

  type User {
    username: String!
    firstName: String!
    lastName: String!
    email: String!
    id: ID!
    avatarImage: String
    createdAt: String
    updatedAt: String
  }

  type AuthResp {
    user: User!
    token: String!
  }

  type UserNatification {
    id: ID!
    message: String!
    success: Boolean
  }
`;
