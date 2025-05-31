import { dbPool } from "../../../config/db";
import { favPackingInterface } from "../../../utils/dbUtils/dataInterfaces";
import { ResultSetHeader } from "mysql2";

export const updateFavPacking = async (data: {
  packing_type: number;
  userId: string;
  Luggage_1: string;
  Luggage_2?: string;
  Luggage_3?: string;
  Luggage_4?: string;
  id?: number;
  Name: string;
}): Promise<ResultSetHeader> => {
  const delete_sql = `DELETE FROM FavPacking WHERE userId =? AND id = ?`;
  const update_sql = `UPDATE FavPacking SET packing_type = ?, Luggage_1 = ?, Luggage_2 = ?, Luggage_3 = ?, Luggage_4 = ? WHERE userId = ? AND id = ?`;

  const DELETE_VALUES = [data.userId, data.id];
  const UPDATE_VALUES = [
    data.packing_type,
    data.Luggage_1,
    data.Luggage_2 ?? null,
    data.Luggage_3 ?? null,
    data.Luggage_4 ?? null,
    data.userId,
    data.id,
  ];

  const connection = await dbPool.getConnection();
  const [res] = await connection.execute<ResultSetHeader>(
    data.packing_type === 2 ? delete_sql : update_sql,
    data.packing_type === 2 ? DELETE_VALUES : UPDATE_VALUES
  );
  connection.release();
  if (res.affectedRows === 0)
    throw `ERROR - Failed to ${
      data.packing_type === 2 ? "delete" : "update"
    } favorite packing`;
  return res;
};
