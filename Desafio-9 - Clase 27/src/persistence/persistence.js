import 'dotenv/config';

/*** importamos la conexión al servidor de MongoDB */
import { ConnectMongoDB } from '../config/connection.js';
/*** importamos los DAO de FS ya instanciados en sus clases correspondientes */
import cartDaoFS from './daos/filesystem/carts/carts.dao.js'
import productDaoFS from './daos/filesystem/products/products.dao.js'
import userDaoFS from "./daos/filesystem/users/users.dao.js";
import messagesDaoFS from './daos/filesystem/messages/messages.dao.js'

/*** importamos los DAO de MongoDB ya instanciados en sus clases correspondientes ****/
import cartDaoMongoDB from './daos/mongodb/carts/carts.dao.js'
import productDaoMongoDB from './daos/mongodb/products/products.dao.js'
import userDaoMongoDB from './daos/mongodb/users/users.dao.js'
import messageDaoMongoDB from './daos/mongodb/messages/messages.dao.js'

/*** Variables y Constantes */
const persistence = process.env.PERSISTENCE

let cartDao;
let userDao;
let productDao;
let msgDao;

switch (persistence) {
    case "FS":
        cartDao = cartDaoFS;
        productDao = productDaoFS;
        userDao = userDaoFS;
        msgDao = messagesDaoFS;
        console.log('Persistencia funcionando en FS:', persistence);
        break;
    case "MONGO":
        ConnectMongoDB.getInstance()
        cartDao = cartDaoMongoDB;
        productDao = productDaoMongoDB;
        userDao = userDaoMongoDB;
        msgDao = messageDaoMongoDB;
        console.log('Persistencia funcionando en Mongo:', persistence);
        break;
    default:
        cartDao = cartDaoFS;
        productDao = productDaoFS;
        userDao = userDaoFS;
        msgDao = messagesDaoFS;
        console.log('Persistencia funcionando en FS x Default:', persistence);
        break;
}


/*** Exportamos las variables que se van a usar en service */
export default { cartDao, userDao, productDao, msgDao };