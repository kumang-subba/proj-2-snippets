import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export default app;
