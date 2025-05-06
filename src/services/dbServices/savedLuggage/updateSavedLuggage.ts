import { dbPool } from "../../../config/db";
import { savedLuggageInterface } from "../../../utils/dbUtils/dataInterfaces";
import { ResultSetHeader } from "mysql2";

export const updateSavedLuggage = async (
  data: savedLuggageInterface
): Promise<ResultSetHeader> => {
  const update_sql = `UPDATE SavedLuggage SET luggage1 = ?, luggage2 = ?, luggage3 = ?, luggage4 = ? WHERE userId = ?`;
  const delete_sql = `DELETE FROM SavedLuggage WHERE userId = ?`;

  const UPDATE_VALUES = [
    data.luggage1,
    data.luggage2,
    data.luggage3,
    data.luggage4,
    data.userId,
  ];

  const DELETE_VALUES = [data.userId];

  function whichValues() {
    if (
      data.luggage1 === null &&
      data.luggage2 === null &&
      data.luggage3 === null &&
      data.luggage4 === null
    ) {
      return DELETE_VALUES;
    }
    return UPDATE_VALUES;
  }

  function whichSql() {
    if (
      data.luggage1 === null &&
      data.luggage1 === null &&
      data.luggage3 === null &&
      data.luggage4 === null
    ) {
      return delete_sql;
    }
    return update_sql;
  }

  const connection = await dbPool.getConnection();
  const [res] = await connection.execute<ResultSetHeader>(
    whichSql(),
    whichValues()
  );
  connection.release();
  if (res.affectedRows === 0) {
    throw "NOS EQUIVOCAMOS";
  }
  return res;
};
