import { dbPool } from "../../../config/db";
import { RowDataPacket } from "mysql2";

export const getFavPacking = async (
  userId: string
): Promise<RowDataPacket[]> => {
  const sql = `SELECT * FROM FavPacking WHERE userId = ?`;
  const VALUES = [userId];

  const connection = await dbPool.getConnection();
  const [res] = await connection.execute<RowDataPacket[]>(sql, VALUES);
  connection.release();
  if (!res) throw "Error getting fav packing";
  return res;
};
