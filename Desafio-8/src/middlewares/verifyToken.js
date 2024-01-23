import jwt from 'jsonwebtoken';
import UserMongoDao from '../daos/mongodb/users/users.dao.js';
const userDao = new UserMongoDao(); //inicilizamos.

const SECRET_KEY = process.env.SECRET_KEY_JWT;

export const verifyToken = async (req, res, next) =>{
    const authHeader = req.get("Authorization");
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({msg:"Authorization header missing"});
    }
    const token = authHeader.split(" ")[1];
    if(!token) return res.status(401).json({msg:"Unauthorized"});
    try {
        const decode = jwt.verify(token, SECRET_KEY);
        console.log("token decodificado");
        console.log(decode);
        const user = await userDao.getById(decode.userId);
        if(!user) return res.status(400).json({msg:"User not found"})
        req.user=user;
        next();
    } catch (error) {
        console.log(error, 'consola de error de jwt archivo verifyToken');
        return res.status(401).json({msg: "Invalid token"});
    }
}