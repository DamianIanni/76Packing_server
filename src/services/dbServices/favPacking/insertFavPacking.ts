import { dbPool } from "../../../config/db";
import { favPackingInterface } from "../../../utils/dbUtils/dataInterfaces";
import { ResultSetHeader } from "mysql2";

interface ResponseError extends Error {
  code?: number;
}

export const insertFavPacking = async (
  data: favPackingInterface
): Promise<number> => {
  const connection = await dbPool.getConnection();

  try {
    // Contar cuántos packings hay actualmente por tipo
    const [rows0] = await connection.execute<any[]>(
      `SELECT COUNT(*) as count FROM FavPacking WHERE userId = ? AND packing_type = 0`,
      [data.userId]
    );
    const [rows1] = await connection.execute<any[]>(
      `SELECT COUNT(*) as count FROM FavPacking WHERE userId = ? AND packing_type = 1`,
      [data.userId]
    );

    const count0 = rows0[0].count;
    const count1 = rows1[0].count;
    const total = count0 + count1;

    // Restricciones y errores con códigos personalizados
    if (data.packing_type === 0 && count0 >= 20) {
      const error: ResponseError = new Error(
        "You can only save 20 history packings"
      );
      error.code = 300;
      throw error;
    }

    if (data.packing_type === 1 && count1 >= 20) {
      const error: ResponseError = new Error(
        "You can only save 20 favorite packings"
      );
      error.code = 310;
      throw error;
    }

    if (total >= 40) {
      const error: ResponseError = new Error(
        "You reached the maximum number of saved packings (40)"
      );
      error.code = 340;
      throw error;
    }

    // Insert si no hay restricciones
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

    const [res] = await connection.execute<ResultSetHeader>(sql, VALUES);

    if (res.affectedRows === 0) throw new Error("Insert failed");
    return res.insertId;
  } finally {
    connection.release();
  }
};
