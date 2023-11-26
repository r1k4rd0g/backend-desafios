import mongoose from 'mongoose';

const connectionString = 'mongodb://127.0.0.1:27017/Coderhouse';
const connectionURL = 'mongodb+srv://r1k4rd0g:S41ntr0w2023@coderhouse.gkusrdv.mongodb.net/ecommerce'

export const initMongoDB = async()=>{
    try {
        await mongoose.connect(connectionURL);
        console.log('conectado a la base de datos de MongoDB');
    } catch (error) {
        console.log(error);
    }
};

initMongoDB();