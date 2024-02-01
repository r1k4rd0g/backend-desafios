import jwt from  'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY_JWT;

export const generateToken = (user)=>{
try {
    const payload = {
        userId : user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY,{
        expiresIn: "10m",
    });
    return token;
} catch (error) {
    console.log('error al general token en auth.js', error);
    throw new Error('error al generar token');
}
}