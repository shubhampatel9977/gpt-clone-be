import express from "express";
import cors from "cors";
import aiRoutes from "./routes/ai.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (_, res) => {
  res.send("Server is running...");
});

app.use("/api", aiRoutes);

export default app;
