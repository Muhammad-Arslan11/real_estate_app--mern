import mongoose from 'mongoose';

const connect_to_db = async (mongo_URL) => {
  try {
    await mongoose.connect(mongo_URL);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ Error connecting to DB:", error);
    process.exit(1);
  }
};

export default connect_to_db;
