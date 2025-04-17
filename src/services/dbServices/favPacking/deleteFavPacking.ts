import { dbPool } from "../../../config/db";

export const deleteFavPacking = async (userId: string): Promise<void> => {
  const sql = `DELETE FROM FavPacking WHERE userId =?`;

  const VALUES = [userId];

  const connection = await dbPool.getConnection();

  try {
    connection.execute(sql, VALUES);
  } catch (error: any) {
    console.log("ERROR DELETING FAV PACKING FROM DB:", error);

    throw error;
  } finally {
    connection.release();
  }
};
