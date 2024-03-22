import mongoose from "mongoose";

const { MONGODB_URI, MONGODB_TEST_URI, NODE_ENV } = process.env;
let selectedMongoDBUri:string;

if (NODE_ENV === "test") {
  if (!MONGODB_TEST_URI) throw new Error("MONGODB_TEST_URI must be defined for testing");
  selectedMongoDBUri = MONGODB_TEST_URI;
} else {
  if (!MONGODB_URI) throw new Error("MONGODB_URI must be defined");
  selectedMongoDBUri = MONGODB_URI;
}

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(selectedMongoDBUri);
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
