import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getAllWords: [Word!]!
    getWordById(id: ID!): Word!
    getAuthenticatedUserWords: [Word!]! @isAuth
  }

  extend type Mutation {
    createNewWord(newWord: WordInput!): Word! @isAuth
    updateWordByID(id: ID!, updatedWord: WordInput!): Word! @isAuth
    deleteWordByID(id: ID!): WordNatification! @isAuth
  }

  input WordInput {
    title: String!
    value: String!
    uncensored: Boolean!
    correctValue: String
    detailedDescription: String
    place: String
    tags: String
  }

  type Word {
    id: ID!
    title: String!
    value: String!
    uncensored: Boolean!
    author: User!
    correctValue: String
    detailedDescription: String
    place: String
    tags: String
    createdAt: String
    updatedAt: String
  }

  type WordNatification {
    id: ID!
    message: String!
    success: Boolean
  }
`;
