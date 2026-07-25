import mongoose from 'mongoose';
import dotenv from 'dotenv';
export async function connectToDatabase() {
    try{
        await mongoose.connect(process.env.MONGODB_URI!)
        console.log('Connected to the database');
    }
    catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}
