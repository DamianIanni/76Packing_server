import { dbPool } from "../../../config/db";
import { RowDataPacket } from "mysql2";

export const getUserStyle = async (
  userId: string
): Promise<RowDataPacket[]> => {
  const sql = "SELECT * FROM UserStyle WHERE userId = ?";
  const VALUES = [userId];

  const connection = await dbPool.getConnection();
  const [res] = await connection.execute<RowDataPacket[]>(sql, VALUES);
  connection.release();
  if (!res) throw "ERROR GETTING USER STYLE";
  return res;
};
