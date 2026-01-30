import mogoose from "mongoose";
import { DB_NAME } from "../contants.js";

const connectDB = async () => {
    try {
        await mogoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
        throw error;
    }
}

export default connectDB;