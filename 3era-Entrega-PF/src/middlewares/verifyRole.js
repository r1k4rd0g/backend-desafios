

export const verifyAdmin = (req, res, next)=>{
    try {
        const user = req.session.passport.user
        console.log('rol de verifyAdmin', user)
        const role = user.role
    if (role === 'admin'){
        next()
    } else {
        res.status(403).json ({message: 'Acceso denegado, no tiene permisos para entrar'})
    }
    } catch (error) {
        throw new Error('Error al verificar el rol')
    }
}

export const verifyUser = (req, res, next)=>{
    try {
        const {role} = req.session.passport.user
    if (role === 'usuario'){
        next()
    } else {
        res.status(403).json ({message: 'Acceso denegado, no tiene permisos para entrar'})
    }
    } catch (error) {
        throw new Error('Error al verificar el rol')
    }
}

