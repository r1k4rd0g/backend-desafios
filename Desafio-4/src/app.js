import express from 'express';
import {__dirname} from './utils.js';
import { errorHandler } from './middlewares/errorHandler.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import viewRouter from './routers/views.router.js';
import productsRouter from './routers/products.router.js';
import cartsRouter from './routers/carts.router.js';


const app = express();
app.use(express.static('data'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());

app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


app.use('/', viewRouter);

const PORT = 8080;
const httpServer = app.listen(PORT, ()=> console.log(`🚀 Server ok en el puerto ${PORT}`));

const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket)=>{
    console.log('🟢 ¡New Connection', socket.id);
})

export default socketServer