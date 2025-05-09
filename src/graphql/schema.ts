import { gql } from "graphql-tag";

export const typeDefs = gql`
  scalar JSON
  type Response {
    success: Boolean!
    message: String
    code: String
    data: JSON
  }

  input FavClothes {
    userId: String!
    Item: String
  }

  input UserStyle {
    userId: String!
    brands: String
    style: String
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
    DateOfBirth: String
    Gender: String
    userId: String
  }

  input PackingPromptInput {
    destination: String!
    duration: Int!
    activities: [String]
    luggageItems: [String!]!
    weatherSensitivity: String
    favoriteClothing: [String]
    accommodationType: String
    utilities: String
    gender: String
    height: Int
    nationality: String!
    age: Int!
    dressStyle: String
  }

  input SavedLuggage {
    luggage1: String
    luggage2: String
    luggage3: String
    luggage4: String
    userId: String!
  }

  input updateFavPackingData {
    userId: String!
    packing_type: Int!
    id: Int!
  }

  type Query {
    promptLuggage(prompt: PackingPromptInput!): Response
    getUser(userId: String!): Response
    getFavClothes(userId: String!): Response
    getFavPacking(userId: String!): Response
    getUserStyle(userId: String!): Response
    getSavedLuggage(userId: String!): Response
    getUserId(email: String!): Response
    getAllUserData(userId: String!): Response
  }

  type Mutation {
    deleteUser(userId: String!): Response
    insertUser(user: User!): Response
    updateUser(user: User!): Response
    insertFavClothes(favClothes: FavClothes!): Response
    updateFavClothes(favClothes: FavClothes!): Response
    insertFavPacking(favPacking: favPacking!): Response
    updateFavPacking(favPacking: updateFavPackingData!): Response
    insertUserStyle(userStyle: UserStyle!): Response
    updateUserStyle(userStyle: UserStyle!): Response
    insertSavedLuggage(savedLuggage: SavedLuggage!): Response
    updateSavedLuggage(savedLuggage: SavedLuggage!): Response
  }
`;
