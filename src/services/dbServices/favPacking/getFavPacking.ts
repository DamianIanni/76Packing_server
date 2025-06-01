import { dbPool } from "../../../config/db";
import { RowDataPacket } from "mysql2";
import { PoolConnection } from "mysql2/promise";
import { favPackingInterface } from "../../../utils/dbUtils/dataInterfaces";

export const getFavPacking = async (
  userId: string,
  conn?: PoolConnection
): Promise<favPackingInterface[] | null> => {
  const sql = `SELECT * FROM FavPacking WHERE userId = ?`;
  const VALUES = [userId];

  const connection = conn || (await dbPool.getConnection());
  const [res] = await connection.execute<RowDataPacket[]>(sql, VALUES);

  if (!conn) connection.release();

  // const row = res as RowDataPacket;

  // const user: favPackingInterface = {
  //   id?: number;
  //   Name: string;
  //   Luggage_1: string;
  //   Luggage_2?: string;
  //   Luggage_3?: string;
  //   Luggage_4?: string;
  //   userId: string;
  //   packing_type: PackingType;
  //   // Agregá el resto si tenés más campos
  // };

  // if (!res[0]) throw "Error getting fav packing";
  // console.log("RES RES", res);
  return res as favPackingInterface[];
};
