import jwt from 'jsonwebtoken';
import UserMongoDao from '../daos/mongodb/users/users.dao.js';
const userDao = new UserMongoDao(); //inicilizamos.

const SECRET_KEY = process.env.SECRET_KEY_JWT;

export const verifyToken = async (req, res, next) =>{
    const authHeader = req.get("Authorization");
    if(!authHeader) return res.status(401).json({msg:"Unauthorized"});
    try {
        
    } catch (error) {
        console.log(error, 'consola de error de jwt archivo verifyToken');
    }
}