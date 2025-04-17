import { dbPool } from "../../config/db";

export async function testConnection(): Promise<void> {
  try {
    const connection = await dbPool.getConnection();
    console.log("✅ Conexión a la base de datos exitosa");
    connection.release(); // Siempre liberar la conexión
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:", error);
  }
}
