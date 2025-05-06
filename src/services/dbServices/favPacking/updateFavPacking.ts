import { dbPool } from "../../../config/db";
import { favPackingInterface } from "../../../utils/dbUtils/dataInterfaces";
import { ResultSetHeader } from "mysql2";

export const updateFavPacking = async (data: {
  packing_type: number;
  userId: string;
  id: number;
}): Promise<ResultSetHeader> => {
  const delete_sql = `DELETE FROM FavPacking WHERE userId =? AND id = ?`;
  const update_sql = `UPDATE FavPacking SET packing_type = ? WHERE userId = ? AND id = ?`;

  const DELETE_VALUES = [data.userId, data.id];
  const UPDATE_VALUES = [data.packing_type, data.userId, data.id];

  const connection = await dbPool.getConnection();
  const [res] = await connection.execute<ResultSetHeader>(
    data.packing_type === 3 ? delete_sql : update_sql,
    data.packing_type === 3 ? DELETE_VALUES : UPDATE_VALUES
  );
  connection.release();
  if (res.affectedRows === 0)
    throw `ERROR - Failed to ${
      data.packing_type === 3 ? "delete" : "update"
    } favorite packing`;
  return res;
};
