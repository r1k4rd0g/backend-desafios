export const productValidator = (req, res, next) =>{
    const {title, description, code, price, stock, category } = req.body;
    if(
        typeof title !== 'string'|| req.body.title === undefined ||
        typeof description !== 'string'|| req.body.description === undefined ||
        typeof code !== 'string'|| req.body.code === undefined ||
        typeof price !== 'number'|| req.body.price === undefined ||
        typeof stock !== 'number'|| req.body.stock === undefined ||
        typeof category !== 'string'|| req.body.category === undefined
    ) res.status(404).json({msg: 'Invalid body'})
    else next();
}