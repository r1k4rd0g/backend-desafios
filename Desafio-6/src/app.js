import './db/connection.js'
import express from 'express';
import {__dirname} from './utils.js';
import { errorHandler } from '../src/middlewares/errorHandler.js';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import viewRouter from './routes/views.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import userRouter from './routes/user.router.js'
import cookieParser from 'cookie-parser';
import session  from 'express-session';
import MongoStore from 'connect-mongo';
import { connectionURL } from './db/connection.js';


const app = express();
const mongoStoreOptions ={
    store: MongoStore.create({
        mongoUrl: connectionURL,
        ttl: 180,
        crypto:{
            secret : '1234'
        }
    }),
    secret: "1234",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 180000,
        secure: false,
        httpOnly: true
    }
}



app.use(express.static('data'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());

app.use(session(mongoStoreOptions));

app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/users', userRouter);
app.use('/', viewRouter);




export const PORT = 8088;
const httpServer = app.listen(PORT, ()=> console.log(`🚀 Server ok en el puerto ${PORT}`));

const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket)=>{
    console.log('🟢 ¡New Connection', socket.id);
    socket.on('deleteProduct', async (data)=>{
        try {
            const {pid} = data;
            console.log('consola 1 app.js:', typeof pid);
            await controllerProducts.remove(pid);
            const products = await controllerProducts.getAllSimple();
            //console.log('consola 3 app.js:', products);
            socketServer.emit('products', products);
        } catch (error) {
            socket.emit('deleteProductError', {errorMessage: error.message});
            console.error(error.message);
        }
    })
})

export default socketServer