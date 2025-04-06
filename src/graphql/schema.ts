import { gql } from "graphql-tag";

export const typeDefs = gql`
  type PromptResponse {
    success: Boolean!
    message: String
    data: String
  }

  input PackingPromptInput {
    destination: String!
    duration: Int!
    activities: [String!]!
    luggageItems: [String!]!
    weatherSensitivity: String!
    favoriteClothing: [String]
    accommodationType: String!
    hasWasherDryer: Boolean
    gender: String!
    height: Int!
    nationality: String!
    age: Int!
    dressStyle: String!
  }

  type Query {
    promptLuggage(message: String!): PromptResponse
    promptTranslation(text: String!, targetLanguage: String!): PromptResponse
    suggestPacking(prompt: PackingPromptInput!): PromptResponse
  }
`;
