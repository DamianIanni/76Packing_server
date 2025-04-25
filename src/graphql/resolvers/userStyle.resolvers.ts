import { successResponse, errorResponse } from "../../utils/responses";
import { insertUserStyle } from "../../services/dbServices/userStyle/insertUserStyle";
import { getUserStyle } from "../../services/dbServices/userStyle/getuserStyle";
import { updateUserStyle } from "../../services/dbServices/userStyle/updateUserStyle";
import { userStyleInterface } from "../../utils/dbUtils/dataInterfaces";

export const userStyleMutationsResolvers = {
  insertUserStyle: async (
    _: any,
    { userStyle }: { userStyle: userStyleInterface }
  ) => {
    try {
      const res = await insertUserStyle(userStyle);
      return successResponse(res);
    } catch (error) {
      return errorResponse(error);
    }
  },
  updateUserStyle: async (
    _: any,
    { userStyle }: { userStyle: userStyleInterface }
  ) => {
    try {
      const res = await updateUserStyle(userStyle);
      return successResponse(res);
    } catch (error) {
      return errorResponse(error);
    }
  },
};

export const userStyleQueriesResolvers = {
  getFavClothes: async (_: any, { userId }: { userId: string }) => {
    try {
      const res = await getUserStyle(userId);
      return successResponse(res);
    } catch (error) {
      return errorResponse(error);
    }
  },
};
