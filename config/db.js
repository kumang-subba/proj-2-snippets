import mongoose from "mongoose";

async function connectDb() {
  await mongoose
    .connect(process.env.MONGO_DB_URI)
    .then(() => console.log("Mongo db connected"))
    .catch((err) => {
      console.error("Failed to cnnect to mongodb database", err);
      process.exit(1);
    });
}

export default connectDb;
