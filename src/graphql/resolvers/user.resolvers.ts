import { successResponse, errorResponse } from "../../utils/responses";
import { userInterface } from "../../utils/dbUtils/dataInterfaces";
import { insertUser } from "../../services/dbServices/users/insertUser";
import { deleteUser } from "../../services/dbServices/users/deleteUser";
import { updateUser } from "../../services/dbServices/users/updateUser";
import { getUser } from "../../services/dbServices/users/getUser";
import { getUserId } from "../../services/dbServices/users/getUserId";

export const userMutationsResolvers = {
  insertUser: async (_: any, { user }: { user: userInterface }) => {
    try {
      const res = await insertUser(user);
      return successResponse(res);
    } catch (error) {
      return errorResponse(error);
    }
  },
  deleteUser: async (_: any, { userId }: { userId: string }) => {
    try {
      const res = await deleteUser(userId);
      return successResponse(res);
    } catch (error) {
      return errorResponse(error);
    }
  },
  updateUser: async (_: any, { user }: { user: userInterface }) => {
    try {
      const res = await updateUser(user);
      return successResponse(res);
    } catch (error) {
      return errorResponse(error);
    }
  },
};

export const userQueriesResolvers = {
  getUser: async (_: any, { userId }: { userId: string }) => {
    try {
      const res = await getUser(userId);
      return successResponse(res);
    } catch (error) {
      return errorResponse(error);
    }
  },
  getUserId: async (_: any, { email }: { email: string }) => {
    try {
      const res = await getUserId(email);
      return successResponse(res);
    } catch (error) {
      return errorResponse(error);
    }
  },
};
