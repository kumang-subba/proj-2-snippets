import app from "./config/express.js";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import router from "./routes/index.js";
import { initCache } from "./cache.js";

async function main() {
  dotenv.config();
  const port = process.env.port || 3000;
  await connectDb();
  await initCache();
  app.use("/api", router);
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}

main();
