//importamos las respuestas predefinidas:
import httpResponse from "../utils/http.response.js"
//importamos diccionario de errores:
import { errorsDictionary } from "../utils/errors.dictionary.js"

export const verifyAdmin = (req, res, next)=>{
    try {
        const user = req.session.passport.user
        console.log('rol de verifyAdmin', user)
        const role = user.role
        console.log(role)
    if (role === 'admin'){
        next()
    } else  //res.status(403).json ({message: 'Acceso denegado, no tiene permisos para entrar'})
        return httpResponse.Unauthorized(res, errorsDictionary.ERROR_VERIFY_ROLE);
    } catch (error) {
        console.log('acá no podría caer')
        throw new Error(errorsDictionary.ERROR_VERIFY_ROLE)
    }
}

export const verifyUser = (req, res, next)=>{
    try {
        const {role} = req.session.passport.user
    if (role === 'usuario'){
        next()
    } else //res.status(403).json ({message: 'Acceso denegado, no tiene permisos para entrar'})
        return httpResponse.Unauthorized(res, errorsDictionary.ERROR_VERIFY_ROLE);
    } catch (error) {
        throw new Error(errorsDictionary.ERROR_VERIFY_ROLE)
    }
}

