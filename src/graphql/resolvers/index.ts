import { promptLuggage_resolver } from "./promptLuggage.resolvers";
import { userMutationsResolvers, userQueriesResolvers } from "./user.resolvers";
import {
  favClothesMutationsResolvers,
  favClothesQueriesResolvers,
} from "./favClothes.resolvers";
import {
  favPackingMutationsResolver,
  favPackingQueriesResolvers,
} from "./favPacking.resolvers";

export const resolvers = {
  Query: {
    ...promptLuggage_resolver,
    ...userQueriesResolvers,
    ...favClothesQueriesResolvers,
    ...favPackingQueriesResolvers,
  },
  Mutation: {
    ...userMutationsResolvers,
    ...favClothesMutationsResolvers,
    ...favPackingMutationsResolver,
  },
};
