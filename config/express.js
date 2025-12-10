import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "https://kumang-subba.github.io",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export default app;
