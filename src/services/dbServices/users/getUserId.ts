import { dbPool } from "../../../config/db";
import { RowDataPacket } from "mysql2";

export const getUserId = async (email: string): Promise<string | undefined> => {
  console.log("userId recibido:", email);
  const sql = `SELECT userId FROM Users WHERE Email = ?`;
  const VALUES = [email];

  const connection = await dbPool.getConnection();
  const [res] = await connection.execute<RowDataPacket[]>(sql, VALUES);
  connection.release();

  //   const user: userInterface = {
  //     userId: row.userId,
  //     Name: row.Name,
  //     Surname: row.Surname,
  //     Email: row.Email,
  //     Height: row.Height,
  //     Gender: row.Gender,
  //     DateOfBirth: row.DateOfBirth,
  //     // Agregá el resto si tenés más campos
  //   };

  if (!res[0]) {
    throw "Error getting user";
  }

  return res[0].userId;
};
