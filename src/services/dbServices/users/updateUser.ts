import { dbPool } from "../../../config/db";
import { userInterface } from "../../../utils/dbUtils/dataInterfaces";

export const updateUser = async (data: userInterface): Promise<void> => {
  const sql = `UPDATE Users SET Name = ?, Surname = ? WHERE userId = ?`;

  const VALUES = [data.name, data.surname, data.userId];

  const connection = await dbPool.getConnection();

  try {
    connection.execute(sql, VALUES);
  } catch (error: any) {
    console.log("ERROR UPDATING USER FROM DB:", error);

    throw error;
  } finally {
    connection.release();
  }
};
