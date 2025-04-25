import { dbPool } from "../../../config/db";
import { ResultSetHeader } from "mysql2";
import { userStyleInterface } from "../../../utils/dbUtils/dataInterfaces";

export const updateUserStyle = async (
  data: userStyleInterface
): Promise<ResultSetHeader> => {
  const delete_sql = `DELETE FROM UserStyle WHERE userId = ?`;
  const update_sql = `UPDATE UserStyle SET brands = ?, style = ? WHERE userId = ?`;

  const DELETE_VALUE = [data.userId];
  const UPDATE_VALUES = [data.brands, data.style, data.userId];

  const connection = await dbPool.getConnection();
  const [res] = await connection.execute<ResultSetHeader>(
    data.brands === "" && data.style === "" ? delete_sql : update_sql,
    data.brands === "" && data.style === "" ? DELETE_VALUE : UPDATE_VALUES
  );
  connection.release();

  if (!res) {
    throw `ERROR - Failed to ${
      data.brands === "" && data.style === "" ? "delete" : "update"
    } favorite clothes`;
  }

  return res;
};
