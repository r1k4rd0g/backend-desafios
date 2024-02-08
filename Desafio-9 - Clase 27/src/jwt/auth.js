import jwt from 'jsonwebtoken';

const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT;

export const generateToken = (user) => {
    try {
        const payload = {
            userId: user._id,
            //email: user.email
        };
        const token = jwt.sign(payload, SECRET_KEY_JWT, {
            expiresIn: 1200, //20 minutos
        });
        return token;
    } catch (error) {
        console.log('error al general token en auth.js', error);
        throw new Error('error al generar token');
    }
}