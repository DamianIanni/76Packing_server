import { dbPool } from "../../../config/db";
import { RowDataPacket } from "mysql2";
import { getUser } from "./getUser";
import { getUserStyle } from "../userStyle/getUserStyle";
import { getFavPacking } from "../favPacking/getFavPacking";
import { getSavedLuggage } from "../savedLuggage/getSavedLuggage";

export const getUserAllData = async (userId: string) => {
  const connection = await dbPool.getConnection();

  const [user, favPacking, savedLuggage, userStyle] = await Promise.all([
    getUser(userId, connection),
    getFavPacking(userId, connection),
    getSavedLuggage(userId, connection),
    getUserStyle(userId, connection),
  ]);

  connection.release();
  const obj = {
    user,
    favPacking,
    savedLuggage,
    userStyle,
  };

  return obj;
};
