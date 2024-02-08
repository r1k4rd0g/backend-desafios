import './db/connection.js'
import './passport/github-strategy.js'
import './passport/local-strategy.js'
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import {__dirname} from './utils.js';
import { errorHandler } from '../src/middlewares/errorHandler.js';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import mainRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import session  from 'express-session';
import MongoStore from 'connect-mongo';
import { connectionURL, initMongoDB } from './db/connection.js';
import passport from 'passport';


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
app.use(express.json()); // lo que hace es traducir  el body de las peticiones a json
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(errorHandler);

app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());

app.use(session(mongoStoreOptions));
/* ------------------------------------ - ----------------------------------- */
//inicializamos a nivel de aplicación, debe de ir luego de las otras lineas
app.use(passport.initialize());
app.use(passport.session());
//y van antes del enrutador, lineas de abajo.
/* ------------------------------------ - ----------------------------------- */

app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


app.use('/', mainRouter.getRouter());
//app.use('api/sessions', sessionRouter); el endpoint para llamar a las diferentes maneras de login.


const persistence = process.env.PERSISTENCE;
if(persistence === 'MONGO') await initMongoDB();


const PORT = process.env.PORT || 8080;
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