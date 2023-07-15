import { MongoClient } from "mongodb";      
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
    await mongoClient.connect();
    console.log("Connected to MongoDB");
}catch(err) {
    console.log(err);
}

const db = mongoClient.db();

export const usersCollection = db.collection("users");
export const sessionsollection = db.collection("sessions");                 
export const transactionsCollection = db.collection("transactions");        
