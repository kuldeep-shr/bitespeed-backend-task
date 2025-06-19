import express from "express";
import * as dotenv from "dotenv";
import { AppDataSource } from "../ormconfig";
import logger from "../src/config/logger";
import app from "../src/config/express";
import cors from "cors";
dotenv.config();

async function startServer() {
  // ✅ Apply middleware BEFORE routes
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // ✅ Enable CORS for localhost and specific domains
  app.use(
    cors({
      origin: "*", // Allow all origins
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );

  try {
    // ✅ Initialize the database BEFORE GraphQL Server starts
    logger.info("Connecting to database...");
    await AppDataSource.initialize();
    logger.info("✅ Database connected successfully");

    // ✅ Start Express Server
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      logger.info(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.info("❌ Error starting server:", error);
  }
}

startServer();
