import mongoose from "mongoose";


export default async function connectToDB(){
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 30000, // Increase the server selection timeout
      };
    try {
        await mongoose.connect("mongodb+srv://adi8218769976:adityamishra821@cluster0.gxuqtdr.mongodb.net/",options)
        console.log("Database Connected Successfully ");
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};