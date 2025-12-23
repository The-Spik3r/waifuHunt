import mysql from "mysql2/promise";

async function initDB() {
  // Primero conectar como root para crear la base de datos
  const rootConnection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: "root",
    password: "rootpassword",
    port: Number(process.env.DB_PORT) || 3307,
  });

  try {
    // Crear la base de datos si no existe
    await rootConnection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || "waifuhunt"}`
    );
    console.log("✓ Base de datos creada/verificada");

    await rootConnection.end();

    // Ahora conectar con el usuario de la aplicación
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "waifuuser",
      password: process.env.DB_PASSWORD || "waifupass",
      database: process.env.DB_NAME || "waifuhunt",
      port: Number(process.env.DB_PORT) || 3307,
    });

    // Crear la tabla users
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        age INT
      )
    `);
    console.log("✓ Tabla users creada/verificada");

    console.log("\n✓ Base de datos inicializada correctamente");
    await connection.end();
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
    throw error;
  }
}

initDB();
