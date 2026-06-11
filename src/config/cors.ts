import cors, { CorsOptions } from "cors";

const corsOptions: CorsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

export const configureCors = () => cors(corsOptions);
