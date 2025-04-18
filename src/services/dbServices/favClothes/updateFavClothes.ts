import { dbPool } from "../../../config/db";
import { ResultSetHeader } from "mysql2";
import { favClothesInterface } from "../../../utils/dbUtils/dataInterfaces";

export const updateFavClothes = async (
  data: favClothesInterface
): Promise<ResultSetHeader> => {
  const delete_sql = `DELETE FROM FavClothes WHERE userId = ?`;
  const update_sql = `UPDATE FavClothes SET Item = ? WHERE userId = ?`;

  const DELETE_VALUE = [data.userId];
  const UPDATE_VALUES = [data.Item, data.userId];

  const connection = await dbPool.getConnection();
  const [res] = await connection.execute<ResultSetHeader>(
    data.Item === "" ? delete_sql : update_sql,
    data.Item === "" ? DELETE_VALUE : UPDATE_VALUES
  );
  connection.release();

  if (!res) {
    throw `ERROR - Failed to ${
      data.Item === "" ? "delete" : "update"
    } favorite clothes`;
  }

  return res;
};
