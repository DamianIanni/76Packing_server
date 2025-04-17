import { dbPool } from "../../../config/db";
import { favClothesInterface } from "../../../utils/dbUtils/dataInterfaces";

export const insertFavClothes = async (
  data: favClothesInterface
): Promise<void> => {
  const sql = `INSERT INTO FavClothes (id, userId, Item) VALUES (?, ?, ?)`;

  const VALUES = [data.id, data.userId, data.Item];

  const connection = await dbPool.getConnection();

  try {
    connection.execute(sql, VALUES);
  } catch (error: any) {
    console.log("ERROR INSERTING FAV ITEM INTO DB:", error);

    throw error;
  } finally {
    connection.release();
  }
};
