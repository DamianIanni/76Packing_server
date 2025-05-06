import { dbPool } from "../../../config/db";
import { RowDataPacket } from "mysql2";
import { favClothesInterface } from "../../../utils/dbUtils/dataInterfaces";

export const getFavClothes = async (
  userId: string
): Promise<favClothesInterface[]> => {
  const sql = "SELECT * FROM FavClothes WHERE userId = ?";
  const VALUES = [userId];

  const connection = await dbPool.getConnection();
  const [res] = await connection.execute<RowDataPacket[]>(sql, VALUES);
  connection.release();
  if (!res[0]) throw "ERROR GETTING FAV CLOTHES";
  return res as favClothesInterface[];
};
