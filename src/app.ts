import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { configureCors } from "@config/cors";
import authRoutes from "@routes/auth.routes";

const app = express();

// Apply CORS middleware
app.use(configureCors());

// Use cookie-parser to parse cookies
app.use(cookieParser());

app.use(express.json());

app.get("/", (_, res) => {
  res.status(200).send("Server is running...");
});

app.use("/api", authRoutes);

export default app;
