import app from "./app";
import { env } from "@config/env";
import { prisma } from "@config/prisma";

const startServer = async () => {
  try {
    await prisma.$connect();

    console.log("PostgreSQL Connected");

    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Database Connection Failed", error);
    process.exit(1);
  }
};

startServer();
