import { gql } from "graphql-tag";

export const typeDefs = gql`
  type PromptResponse {
    success: Boolean!
    message: String
    data: String
  }

  type Query {
    prompt1(message: String!): PromptResponse
    prompt2(message: String!): PromptResponse
    prompt5(message: String!): PromptResponse
  }
`;
