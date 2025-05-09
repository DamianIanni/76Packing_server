import { getUserAllData } from "../../services/dbServices/users/getUserAllData";
import { successResponse, errorResponse } from "../../utils/responses";

export const getAllUserDataQueryResolver = {
  getAllUserData: async (_: any, { userId }: { userId: string }) => {
    try {
      const res = await getUserAllData(userId);
      return successResponse(res);
    } catch (error) {
      console.log("ERROR WITH ALL DATA", error);
      return errorResponse(error);
    }
  },
};

///EXAMPLE
// utils/dbFunctions/getUser.ts
// export const getUser = async (userId: string, connection?: PoolConnection) => {
//     const conn = connection || (await dbPool.getConnection());
//     const [res] = await conn.execute('SELECT * FROM Users WHERE userId = ?', [userId]);
//     if (!connection) conn.release(); // liberás si fue creada acá
//     return res;
//   };
