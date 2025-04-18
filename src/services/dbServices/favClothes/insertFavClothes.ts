import { dbPool } from "../../../config/db";
import { favClothesInterface } from "../../../utils/dbUtils/dataInterfaces";
import { ResultSetHeader } from "mysql2";

export const insertFavClothes = async (
  data: favClothesInterface
): Promise<ResultSetHeader> => {
  const sql = `INSERT INTO FavClothes (userId, Item) VALUES (?, ?)`;

  const VALUES = [data.userId, data.Item];

  const connection = await dbPool.getConnection();
  const [res] = await connection.execute<ResultSetHeader>(sql, VALUES);
  connection.release();
  if (!res) {
    throw "error";
  }
  return res;
};
