export const productValidator = (req, res, next) =>{
    if(
        title == undefined
    ) res.status(404).json({msg: 'Invalid body'})
    next();
}