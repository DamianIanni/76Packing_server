import { dbPool } from "../../../config/db";
import { RowDataPacket } from "mysql2";
import { getUser } from "./getUser";
import { getUserStyle } from "../userStyle/getuserStyle";
import { getFavPacking } from "../favPacking/getFavPacking";
import { getSavedLuggage } from "../savedLuggage/getsavedLuggage";

export const getUserAllData = async (userId: string) => {
  const connection = await dbPool.getConnection();

  const [user, favPacking, savedLuggage, userStyle] = await Promise.all([
    getUser(userId, connection),
    getFavPacking(userId, connection),
    getSavedLuggage(userId, connection),
    getUserStyle(userId, connection),
  ]);

  console.log(favPacking);

  connection.release();
  const obj = {
    user,
    favPacking,
    savedLuggage,
    userStyle,
  };

  return obj;
};
