import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log("database connected")
    } catch (error) {
        console.error(error);
        process.exit(1);
        
    }
}
export default connectDB