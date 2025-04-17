import { dbPool } from "../../../config/db";
import { favPackingInterface } from "../../../utils/dbUtils/dataInterfaces";

export const insertFavPacking = async (
  data: favPackingInterface
): Promise<void> => {
  const sql = `INSERT INTO FavPacking (id, Name, Luggage_1, Luggage_2, Luggage_3, Luggage_4, userId, packing_type) VALUES (?, ?, ?, ?, ?, ?)`;

  const VALUES = [
    data.id,
    data.Name,
    data.Luggage_1,
    data.Luggage_2,
    data.Luggage_3,
    data.Luggage_4,
    data.userId,
    data.packing_type,
  ];

  const connection = await dbPool.getConnection();

  try {
    connection.execute(sql, VALUES);
  } catch (error: any) {
    console.log("ERROR INSERTING FAV PACKING INTO DB:", error);

    throw error;
  } finally {
    connection.release();
  }
};
