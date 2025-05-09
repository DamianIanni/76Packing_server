import { dbPool } from "../../../config/db";
import { RowDataPacket } from "mysql2";
import { PoolConnection } from "mysql2/promise";

export const getUserStyle = async (userId: string, conn?: PoolConnection) => {
  const sql = "SELECT * FROM UserStyle WHERE userId = ?";
  const VALUES = [userId];

  const connection = conn || (await dbPool.getConnection());
  const [res] = await connection.execute<RowDataPacket[]>(sql, VALUES);
  if (!conn) connection.release();
  // if (!res[0]) throw "ERROR GETTING USER STYLE";
  return res[0] || null;
};
