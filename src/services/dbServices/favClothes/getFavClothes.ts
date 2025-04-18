import { dbPool } from "../../../config/db";
import { RowDataPacket } from "mysql2";

export const getFavClothes = async (
  userId: string
): Promise<RowDataPacket[]> => {
  const sql = "SELECT * FROM FavClothes WHERE userId = ?";
  const VALUES = [userId];

  const connection = await dbPool.getConnection();
  const [res] = await connection.execute<RowDataPacket[]>(sql, VALUES);
  connection.release();
  if (!res) throw "ERROR GETTING FAV CLOTHES";
  return res;
};
