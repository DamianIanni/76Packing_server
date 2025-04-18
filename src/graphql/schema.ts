import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Response {
    success: Boolean!
    message: String
    code: String
    data: String
  }

  input FavClothes {
    userId: String!
    Item: String
  }

  input favPacking {
    Name: String!
    Luggage_1: String!
    Luggage_2: String
    Luggage_3: String
    Luggage_4: String
    userId: String!
    packing_type: Int!
  }

  input User {
    Email: String!
    Name: String!
    Surname: String!
    userId: String!
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
    promptLuggage(prompt: PackingPromptInput!): Response
    getUser(userId: String!): Response
    getFavClothes(userId: String!): Response
    getFavPacking(userId: String!): Response
  }

  type Mutation {
    deleteUser(userId: String!): Response
    insertUser(user: User!): Response
    updateUser(user: User!): Response
    insertFavClothes(favClothes: FavClothes!): Response
    updateFavClothes(favClothes: FavClothes!): Response
    insertFavPacking(favPacking: favPacking!): Response
    updateFavPacking(favPacking: favPacking!): Response
  }
`;
