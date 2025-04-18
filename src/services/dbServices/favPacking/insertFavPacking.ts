import { dbPool } from "../../../config/db";
import { favPackingInterface } from "../../../utils/dbUtils/dataInterfaces";
import { ResultSetHeader } from "mysql2";

export const insertFavPacking = async (
  data: favPackingInterface
): Promise<ResultSetHeader> => {
  const sql = `INSERT INTO FavPacking (Name, Luggage_1, Luggage_2, Luggage_3, Luggage_4, userId, packing_type) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  const VALUES = [
    data.Name,
    data.Luggage_1,
    data.Luggage_2,
    data.Luggage_3,
    data.Luggage_4,
    data.userId,
    data.packing_type,
  ];

  const connection = await dbPool.getConnection();
  const [res] = await connection.execute<ResultSetHeader>(sql, VALUES);
  connection.release();
  if (!res) throw "errorcito";

  return res;
};
