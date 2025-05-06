import { dbPool } from "../../../config/db";
import { RowDataPacket } from "mysql2";
import { savedLuggageInterface } from "../../../utils/dbUtils/dataInterfaces";

export const getSavedLuggage = async (
  userId: string
): Promise<savedLuggageInterface | undefined> => {
  console.log("userId recibido:", userId);
  const sql = `SELECT * FROM SavedLuggage WHERE userId = ?`;
  const VALUES = [userId];

  const connection = await dbPool.getConnection();
  const [res] = await connection.execute<RowDataPacket[]>(sql, VALUES);
  connection.release();
  const row = res[0] as RowDataPacket;

  const savedLuggage: savedLuggageInterface = {
    id: row.id,
    userId: row.userId,
    luggage1: row.luggage1,
    luggage2: row.luggage2,
    luggage3: row.luggage3,
    luggage4: row.luggage4,
    // Agregá el resto si tenés más campos
  };

  if (!res[0]) {
    throw "Error getting user";
  }

  return savedLuggage;
};
