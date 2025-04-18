import { dbPool } from "../../../config/db";
import { userInterface } from "../../../utils/dbUtils/dataInterfaces";
import { ResultSetHeader } from "mysql2";
import { v4 as uuidv4 } from "uuid";

export const insertUser = async (
  data: userInterface
): Promise<ResultSetHeader> => {
  const sql = `INSERT INTO Users (Email, Name, Surname, userId) VALUES (?, ?, ?, ?)`;
  const uuid = uuidv4();

  const VALUES = [data.Email, data.Name, data.Surname, uuid];

  const connection = await dbPool.getConnection();

  const [res] = await connection.execute<ResultSetHeader>(sql, VALUES);
  console.log("INSERTED USER INTO DB", res);

  connection.release();
  if (!res) {
    console.log("ERROR INSERTING USER INTO DB:");
    throw "ERRORSITO";
  }
  return res;
};
