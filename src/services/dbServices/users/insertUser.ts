import { dbPool } from "../../../config/db";
import { userInterface } from "../../../utils/dbUtils/dataInterfaces";

export const insertUser = async (data: userInterface): Promise<void> => {
  const sql = `INSERT INTO Users (Email, Name, Surname, userId) VALUES (?, ?, ?, ?)`;

  const VALUES = [data.email, data.name, data.surname, data.userId];

  const connection = await dbPool.getConnection();

  try {
    connection.execute(sql, VALUES);
  } catch (error: any) {
    console.log("ERROR INSERTING USER INTO DB:", error);

    throw error;
  } finally {
    connection.release();
  }
};
