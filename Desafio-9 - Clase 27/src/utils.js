import {dirname} from 'path';
import { fileURLToPath } from 'url';
export const __dirname = dirname(fileURLToPath(import.meta.url));

/* ------------------------------------ - ----------------------------------- */

import { hashSync, genSaltSync, compareSync } from 'bcrypt';

export const createHash = (password) =>{
    return hashSync(password, genSaltSync(10))
}
/**
 *
 * @param {*} password contraseña ingresada por usuario, sin hashear
 * @param {*} user, usuario ingresado y que se buscará en la base de datos
 * @returns retorna un booleano, true o false
 */
export const isValidPass = (password, user)=>{
    return compareSync(password, user.password) //toma el password que no está haseado y lo compara con el pass que está en la base de datos de ese usuario.
}

/*-función de respuestas -*/

export const createResponse = (res, statusCode, data)=>{
    return res.status(statusCode).json({data});
}