import { dbPool } from "../../../config/db";

export const deleteUser = async (userId: string): Promise<void> => {
  const sql = `DELETE FROM Users WHERE userId = ?`;

  const VALUES = [userId];

  const connection = await dbPool.getConnection();

  try {
    connection.execute(sql, VALUES);
  } catch (error: any) {
    console.log("ERROR DELETING USER FROM DB:", error);

    throw error;
  } finally {
    connection.release();
  }
};
