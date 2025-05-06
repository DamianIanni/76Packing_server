import { dbPool } from "../../../config/db";
import { userInterface } from "../../../utils/dbUtils/dataInterfaces";
import { ResultSetHeader } from "mysql2";

export const updateUser = async (
  data: userInterface
): Promise<ResultSetHeader> => {
  const sql = `UPDATE Users SET Name = ?, Surname = ?, date_of_birth = ?, gender = ? WHERE userId = ?`;

  const VALUES = [
    data.Name,
    data.Surname,
    data.DateOfBirth,
    data.Gender,
    data.userId,
  ];

  const connection = await dbPool.getConnection();
  const [res] = await connection.execute<ResultSetHeader>(sql, VALUES);
  connection.release();
  if (res.affectedRows === 0) {
    throw "NOS EQUIVOCAMOS";
  }
  return res;
};
