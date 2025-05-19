import { dbPool } from "../../../config/db";
import { RowDataPacket } from "mysql2";
import { PoolConnection } from "mysql2/promise";
import { userInterface } from "../../../utils/dbUtils/dataInterfaces";

export const getUser = async (
  userId: string,
  conn?: PoolConnection
): Promise<userInterface | undefined> => {
  console.log("userId recibido:", userId);
  const sql = `SELECT * FROM Users WHERE userId = ?`;
  const VALUES = [userId];

  const connection = conn || (await dbPool.getConnection());
  const [res] = await connection.execute<RowDataPacket[]>(sql, VALUES);
  if (!conn) connection.release();
  const row = res[0] as RowDataPacket;

  const user: userInterface = {
    userId: row.userId,
    Name: row.Name,
    Surname: row.Surname,
    Email: row.Email,
    Height: row.Height,
    Gender: row.Gender,
    DateOfBirth: row.date_of_birth,
    // Agregá el resto si tenés más campos
  };

  if (!res[0]) {
    throw "Error getting user";
  }

  return user;
};
