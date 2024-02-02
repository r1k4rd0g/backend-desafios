import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import usersServices from '../services/users.service.js';



const strategyOptions = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
};

/* ----------------------------- lógica registro ---------------------------- */
const register = async (req, email, password, done) => {
    try {
        // const { first_name, last_name,... } = req.body
        const user = await usersServices.getByEmail(email);
        if (user) return done(null, false);
        console.log('console local-strategy.register, el req.body es un:',typeof req.body)
        const newUser = await usersServices.createUser(req.body);
        return done(null, newUser);
    } catch (error) {
        console.log(error);
        return done(null, false)
    }
};


/* ------------------------------ lógica login ------------------------------ */
const login = async (req, email, password, done) => {
    try {
        const user = req.body;
        //console.log('consola local strategy - login que lee user:', user);
        const userLogin = await usersServices.login(user);
        //console.log('LOGIN', userLogin);
        if (!userLogin) return done(null, false, { message: 'User not found' });
        return done(null, userLogin);
    } catch (error) {
        console.log(error);
    }
};

/* ------------------------------- strategies ------------------------------- */
const registerStrategy = new LocalStrategy(strategyOptions, register);
const loginStrategy = new LocalStrategy(strategyOptions, login);



/* ----------------------------- inicializacion ----------------------------- */
passport.use('login-local', loginStrategy);
passport.use('register-local', registerStrategy);



/* ------------------------- serialize y deserialize ------------------------ */
//guarda al usuario en req.session.passport
//req.session.passport.user --> id del usuario
passport.serializeUser((user, done) => {
    done(null, user._id)
});

passport.deserializeUser(async (id, done) => {
    const user = await usersServices.getById(id);
    return done(null, user);
});