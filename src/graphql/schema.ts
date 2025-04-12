import { gql } from "graphql-tag";

export const typeDefs = gql`
  type PromptResponse {
    success: Boolean!
    message: String
    code: String
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
    utilities: String!
    gender: String!
    height: Int!
    nationality: String!
    age: Int!
    dressStyle: String!
  }

  type Query {
    promptLuggage(prompt: PackingPromptInput!): PromptResponse
  }
`;
