import { dbPool } from "../../../config/db";
import { favPackingInterface } from "../../../utils/dbUtils/dataInterfaces";
import { ResultSetHeader } from "mysql2";

export const updateFavPacking = async (
  data: favPackingInterface
): Promise<ResultSetHeader> => {
  const delete_sql = `DELETE FROM FavPacking WHERE userId =?`;
  const update_sql = `UPDATE FavPacking SET packing_type = ? WHERE userId = ?`;

  const DELETE_VALUES = [data.userId];
  const UPDATE_VALUES = [data.packing_type, data.userId];

  const connection = await dbPool.getConnection();
  const [res] = await connection.execute<ResultSetHeader>(
    data.packing_type === 3 ? delete_sql : update_sql,
    data.packing_type === 3 ? DELETE_VALUES : UPDATE_VALUES
  );
  connection.release();
  if (!res)
    throw `ERROR - Failed to ${
      data.packing_type === 3 ? "delete" : "update"
    } favorite packing`;
  return res;
};
