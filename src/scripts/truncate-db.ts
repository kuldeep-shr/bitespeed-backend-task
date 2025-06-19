import { AppDataSource } from "../../ormconfig";

async function truncateAllTables() {
  try {
    const connection = await AppDataSource.initialize();
    const entities = AppDataSource.entityMetadatas;

    for (const entity of entities) {
      const tableName = entity.tableName;

      // DELETE all rows from table
      await connection.query(`DELETE FROM "${tableName}";`);

      // Reset autoincrement value for SQLite (optional)
      await connection.query(
        `DELETE FROM sqlite_sequence WHERE name='${tableName}';`
      );

      console.log(`✅ Cleared table: ${tableName}`);
    }

    console.log("🎉 All SQLite tables truncated successfully.");
    await connection.destroy();
  } catch (error) {
    console.error("❌ Error truncating tables:", error);
    process.exit(1);
  }
}

truncateAllTables();
