import { dbPool } from "../../../config/db";
import { RowDataPacket } from "mysql2";
import { PoolConnection } from "mysql2/promise";
import { savedLuggageInterface } from "../../../utils/dbUtils/dataInterfaces";

export const getSavedLuggage = async (
  userId: string,
  conn?: PoolConnection
): Promise<savedLuggageInterface | null> => {
  console.log("userId recibido:", userId);
  const sql = `SELECT * FROM SavedLuggage WHERE userId = ?`;
  const VALUES = [userId];

  const connection = conn || (await dbPool.getConnection());
  const [res] = await connection.execute<RowDataPacket[]>(sql, VALUES);
  if (!conn) connection.release();
  const row = res[0] as RowDataPacket;

  const savedLuggage: savedLuggageInterface | null = !res[0]
    ? null
    : {
        id: row.id,
        userId: row.userId,
        luggage1: row.luggage1,
        luggage2: row.luggage2,
        luggage3: row.luggage3,
        luggage4: row.luggage4,
        // Agregá el resto si tenés más campos
      };

  return savedLuggage;
};
