import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getAllUsers: [User!]!
    getUserId(id: ID!): User!
  }

  extend type Mutation {
    createNewUser(newUser: UserInput!): User!
    deleteUserById(id: ID!): UserNatification
    editUserById(updatedUser: UserInput, id: ID!): User!
  }

  input UserInput {
    name: String!
    login: String!
    password: String!
  }

  type User {
    id: ID!
    name: String!
    login: String!
    password: String!
    createdAt: String
    updatedAt: String
  }
  
  type UserNatification {
    id: ID!
    message: String!
    success: Boolean
  }
`;
