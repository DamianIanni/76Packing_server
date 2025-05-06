import { dbPool } from "../../../config/db";
import { savedLuggageInterface } from "../../../utils/dbUtils/dataInterfaces";
import { ResultSetHeader } from "mysql2";

export const insertSavedLuggage = async (
  data: savedLuggageInterface
): Promise<ResultSetHeader> => {
  const sql = `INSERT INTO SavedLuggage (luggage1, luggage2, luggage3, luggage4, userId) VALUES (?, ?, ?, ?, ?)`;

  const VALUES = [
    data.luggage1,
    data.luggage2,
    data.luggage3,
    data.luggage4,
    data.userId,
  ];

  const connection = await dbPool.getConnection();

  const [res] = await connection.execute<ResultSetHeader>(sql, VALUES);
  console.log("INSERTED savedLuggage INTO DB", res);

  connection.release();
  if (res.affectedRows === 0) {
    console.log("ERROR INSERTING AVED LUGGAGE INTO DB:");
    throw "ERRORSITO";
  }
  return res;
};
