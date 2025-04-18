import { dbPool } from "../../../config/db";
import { userInterface } from "../../../utils/dbUtils/dataInterfaces";
import { ResultSetHeader } from "mysql2";

export const updateUser = async (
  data: userInterface
): Promise<ResultSetHeader> => {
  const sql = `UPDATE Users SET Name = ?, Surname = ? WHERE userId = ?`;

  const VALUES = [data.Name, data.Surname, data.userId];

  const connection = await dbPool.getConnection();
  const [res] = await connection.execute<ResultSetHeader>(sql, VALUES);
  connection.release();
  if (!res) {
    throw "NOS EQUIVOCAMOS";
  }
  return res;
};
