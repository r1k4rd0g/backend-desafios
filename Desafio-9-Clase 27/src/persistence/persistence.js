import 'dotenv/config';

/*** importamos la conexión al servidor de MongoDB */
import { ConnectMongoDB } from '../config/connection.js';
/*** importamos los DAO de FS  ****/
import CartsDaoFS from './daos/filesystem/carts/carts.dao.js'
import ProductDaoFS from './daos/filesystem/products/products.dao.js'
import UserDaoFS from './daos/filesystem/users/users.dao.js';
import MessageFSDao from './daos/filesystem/messages/messages.dao.js'

/*** importamos los DAO de MongoDB  ****/
import CartMongoDao from './daos/mongodb/carts/carts.dao.js'
import ProductMongoDao from './daos/mongodb/products/products.dao.js'
import UserMongoDao from './daos/mongodb/users/users.dao.js'
import MsgMongoDao from './daos/mongodb/messages/messages.dao.js'

/*** Variables y Constantes */
let cartDao;
let userDao;
let productDao;
let msgDao;
const persistence = process.env.PERSISTENCE


switch (persistence) {
    case "FS":
        cartDao = new CartsDaoFS();
        productDao = new ProductDaoFS();
        userDao = new  UserDaoFS();
        msgDao = new MessageFSDao();
        console.log('Persistencia funcionando en FS:', persistence);
        break;
    case "MONGO":
        ConnectMongoDB.getInstance()
        cartDao = new CartMongoDao();
        productDao = new ProductMongoDao();
        userDao = new UserMongoDao();
        msgDao = new  MsgMongoDao();
        console.log('Persistencia funcionando en Mongo:', persistence);
        break;
    default:
        cartDao = new CartsDaoFS();
        productDao = new ProductDaoFS();
        userDao = new  UserDaoFS();
        msgDao = new MessageFSDao();
        console.log('Persistencia funcionando en FS x Default:', persistence);
        break;
}


/*** Exportamos las variables que se van a usar en service */
export default { cartDao, userDao, productDao, msgDao };