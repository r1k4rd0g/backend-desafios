//importamos las respuestas predefinidas
import httpResponse from "../utils/http.response.js"

export const errorHandler = (error, req, res, next) => {
    console.log( `error ${error.message}`)
    return httpResponse.NotFound(res, error.message)
}