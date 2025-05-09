import { promptLuggage_resolver } from "./promptLuggage.resolvers";
import { userMutationsResolvers, userQueriesResolvers } from "./user.resolvers";
import {
  userStyleMutationsResolvers,
  userStyleQueriesResolvers,
} from "./userStyle.resolvers";
import {
  favClothesMutationsResolvers,
  favClothesQueriesResolvers,
} from "./favClothes.resolvers";
import {
  favPackingMutationsResolver,
  favPackingQueriesResolvers,
} from "./favPacking.resolvers";
import {
  savedLuggageMutationsResolvers,
  savedLuggageQueriesResolvers,
} from "./savedLuggage.resolvers";
import { getAllUserDataQueryResolver } from "./allData.resolvers";
import GraphQLJSON from "graphql-type-json";

export const resolvers = {
  Query: {
    ...promptLuggage_resolver,
    ...userQueriesResolvers,
    ...favClothesQueriesResolvers,
    ...favPackingQueriesResolvers,
    ...userStyleQueriesResolvers,
    ...savedLuggageQueriesResolvers,
    ...getAllUserDataQueryResolver,
  },
  Mutation: {
    ...userMutationsResolvers,
    ...favClothesMutationsResolvers,
    ...favPackingMutationsResolver,
    ...userStyleMutationsResolvers,
    ...savedLuggageMutationsResolvers,
  },
  JSON: GraphQLJSON,
};
