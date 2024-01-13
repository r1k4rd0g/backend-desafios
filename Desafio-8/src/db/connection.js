import mongoose from 'mongoose';
import 'dotenv/config'

export const connectionURL = process.env.MONGO_URL;

export const initMongoDB = async()=>{
    try {
        await mongoose.connect(connectionURL);
        console.log('conectado a la base de datos de MongoDB');
    } catch (error) {
        console.log(error);
    }
};

initMongoDB();