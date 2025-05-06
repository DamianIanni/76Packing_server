import { dbPool } from "../../../config/db";
import { ResultSetHeader } from "mysql2";

export const deleteUser = async (userId: string): Promise<ResultSetHeader> => {
  const sql = `DELETE FROM Users WHERE userId = ?`;

  const VALUES = [userId];

  const connection = await dbPool.getConnection();
  const [res] = await connection.execute<ResultSetHeader>(sql, VALUES);
  connection.release();
  if (res.affectedRows === 0) throw "Error deleting user from DB";
  return res;
};
