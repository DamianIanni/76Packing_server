import { dbPool } from "../../../config/db";
import { userStyleInterface } from "../../../utils/dbUtils/dataInterfaces";
import { ResultSetHeader } from "mysql2";

export const insertUserStyle = async (
  data: userStyleInterface
): Promise<ResultSetHeader> => {
  const sql = `INSERT INTO UserStyle (userId, brands, style) VALUES (?, ?, ?)`;

  const VALUES = [data.userId, data.brands, data.style];

  const connection = await dbPool.getConnection();
  const [res] = await connection.execute<ResultSetHeader>(sql, VALUES);
  connection.release();
  if (!res) {
    throw "error";
  }
  return res;
};
