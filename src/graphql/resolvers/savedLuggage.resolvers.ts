import { successResponse, errorResponse } from "../../utils/responses";
import { getSavedLuggage } from "../../services/dbServices/savedLuggage/getsavedLuggage";
import { insertSavedLuggage } from "../../services/dbServices/savedLuggage/insertSavedLuggage";
import { updateSavedLuggage } from "../../services/dbServices/savedLuggage/updateSavedLuggage";
import { savedLuggageInterface } from "../../utils/dbUtils/dataInterfaces";

export const savedLuggageMutationsResolvers = {
  insertSavedLuggage: async (
    _: any,
    { savedLuggage }: { savedLuggage: savedLuggageInterface }
  ) => {
    try {
      const res = await insertSavedLuggage(savedLuggage);
      return successResponse(res);
    } catch (error) {
      return errorResponse(error);
    }
  },
  updateSavedLuggage: async (
    _: any,
    { savedLuggage }: { savedLuggage: savedLuggageInterface }
  ) => {
    try {
      const res = await updateSavedLuggage(savedLuggage);
      return successResponse(res);
    } catch (error) {
      return errorResponse(error);
    }
  },
};

export const savedLuggageQueriesResolvers = {
  getSavedLuggage: async (_: any, { userId }: { userId: string }) => {
    try {
      const res = await getSavedLuggage(userId);
      return successResponse(res);
    } catch (error) {
      errorResponse(error);
    }
  },
};
