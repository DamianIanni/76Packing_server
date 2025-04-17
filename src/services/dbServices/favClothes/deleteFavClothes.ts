import { dbPool } from "../../../config/db";

export const insertFavClothes = async (userId: string): Promise<void> => {
  const sql = `DELETE FROM FavClothes WHERE userId = ?`;

  const VALUES = [userId];

  const connection = await dbPool.getConnection();

  try {
    connection.execute(sql, VALUES);
  } catch (error: any) {
    console.log("ERROR DELETING FAV ITEM FROM DB:", error);

    throw error;
  } finally {
    connection.release();
  }
};
