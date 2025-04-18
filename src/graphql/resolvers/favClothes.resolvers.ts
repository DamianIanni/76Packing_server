import { successResponse, errorResponse } from "../../utils/responses";
import { insertFavClothes } from "../../services/dbServices/favClothes/insertFavClothes";
import { updateFavClothes } from "../../services/dbServices/favClothes/updateFavClothes";
import { favClothesInterface } from "../../utils/dbUtils/dataInterfaces";
import { getFavClothes } from "../../services/dbServices/favClothes/getFavClothes";

export const favClothesMutationsResolvers = {
  insertFavClothes: async (
    _: any,
    { favClothes }: { favClothes: favClothesInterface }
  ) => {
    try {
      const res = await insertFavClothes(favClothes);
      return successResponse(res);
    } catch (error) {
      return errorResponse(error);
    }
  },
  updateFavClothes: async (
    _: any,
    { favClothes }: { favClothes: favClothesInterface }
  ) => {
    try {
      const res = await updateFavClothes(favClothes);
      return successResponse(res);
    } catch (error) {
      return errorResponse(error);
    }
  },
};

export const favClothesQueriesResolvers = {
  getFavClothes: async (_: any, { userId }: { userId: string }) => {
    try {
      const res = await getFavClothes(userId);
      return successResponse(res);
    } catch (error) {
      return errorResponse(error);
    }
  },
};
