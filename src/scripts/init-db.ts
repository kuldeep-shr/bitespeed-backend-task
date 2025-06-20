import "reflect-metadata";
import { AppDataSource } from "../../ormconfig";

const initDB = async () => {
  try {
    await AppDataSource.initialize();
    const queryRunner = AppDataSource.createQueryRunner();

    // Check if 'contacts' table exists
    const hasContactsTable = await queryRunner.hasTable("contacts");

    if (hasContactsTable) {
      console.log("✅ 'contacts' table already exists. Skipping creation.");
    } else {
      console.log("📦 'contacts' table not found. Creating tables...");
      await AppDataSource.synchronize();
      console.log("✅ Database schema synchronized. Tables created.");
    }

    await queryRunner.release();
    await AppDataSource.destroy();
  } catch (err) {
    console.error("❌ Failed to initialize database:", err);
    process.exit(1);
  }
};

initDB();
