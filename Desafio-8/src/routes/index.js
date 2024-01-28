import { Router } from 'express';
//importamos las rutas  de los controladores:
import productRouter from '../routes/products.router.js'
import userRouter from '../routes/user.router.js'
import cartsRouter from '../routes/carts.router.js'
import viewRouter from '../routes/views.router.js'


class MainRouter {
    constructor() {
        this.router= Router();
        this.initRoutes();
    };
    //creamos el método initRoutes:
    initRoutes(){
        this.router.use("/api/products", productRouter);
        this.router.use("/api/carts", cartsRouter);
        this.router.use("/api/users", userRouter);
        this.router.use("/", viewRouter);
    };
    //inicialización del enrutador:
    getRouter(){
        return this.router;
    }
}

const mainRouter = new MainRouter();
export default mainRouter;