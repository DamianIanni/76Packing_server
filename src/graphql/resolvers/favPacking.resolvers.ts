import { successResponse, errorResponse } from "../../utils/responses";
import { insertFavPacking } from "../../services/dbServices/favPacking/insertFavPacking";
import { updateFavPacking } from "../../services/dbServices/favPacking/updateFavPacking";
import { favPackingInterface } from "../../utils/dbUtils/dataInterfaces";
import { getFavPacking } from "../../services/dbServices/favPacking/getFavPacking";

export const favPackingMutationsResolver = {
  insertFavPacking: async (
    _: any,
    { favPacking }: { favPacking: favPackingInterface }
  ) => {
    try {
      const res = await insertFavPacking(favPacking);
      return successResponse(res);
    } catch (error) {
      return errorResponse(error);
    }
  },
  updateFavPacking: async (
    _: any,
    { favPacking }: { favPacking: favPackingInterface }
  ) => {
    try {
      const res = await updateFavPacking(favPacking);
      return successResponse(res);
    } catch (error) {
      return errorResponse(error);
    }
  },
};

export const favPackingQueriesResolvers = {
  getFavPacking: async (_: any, { userId }: { userId: string }) => {
    try {
      const res = await getFavPacking(userId);
      return successResponse(res);
    } catch (error) {
      return errorResponse(error);
    }
  },
};
