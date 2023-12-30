import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import * as usersServices from '../services/users.service.js';



//traemos las credenciales del app github

/*
app id: 720593
cliente id: Iv1.4bd7f92440eecbc2
cliente secret: 630c1746089da2e6fcac8ea358b494738a422ad2
*/
//ahora llenamos con los datos que nos da github: (estos datos son del profe)
const strategyRegister = {
    clientID: "Iv1.4bd7f92440eecbc2",
    clientSecret: "630c1746089da2e6fcac8ea358b494738a422ad2",
    callbackURL: "http://localhost:8088/api/users/github-register", //tenemos que tener creado el endpoint de esta url
};
const strategyLogin = {
    clientID: "Iv1.4bd7f92440eecbc2",
    clientSecret: "630c1746089da2e6fcac8ea358b494738a422ad2",
    callbackURL: "http://localhost:8088/api/users/github-login", //tenemos que tener creado el endpoint de esta url
};

/*const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    try{
        //console.log(profile); //nota: de acá veremos los datos que vienen y podremos usar
        const email = profile._json.email; //este dato se saca de la cuenta de github
        //console.log(typeof email, 'verifico email')
        const userExist = await usersServices.getByEmail(email);
        const fullName = profile._json.name;
        const nameParts = fullName.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ');
        //console.log(typeof firstName)
        if (userExist){
            const userData = {
                email,
                password: "1234",
            }
            const userLogin = await usersServices.login(userData)
            return done(null, userLogin, {profile, firstName, lastName});
        }
        else {
            const userData = {
                first_name: firstName,
                last_name: lastName,
                email,
                password: "1234",
                isGithub: true,
                //Image: profile._json.avatar_url,
            }
            const userCreated = await usersServices.createUser(userData);
            //console.log('consola de strategy', userCreated);
            return done(null, userCreated)
            }
        }
    catch (error) {
        console.error('Error en la autenticación:', error);
        return done(error);
    };
};*/

const registerGithub = async (accessToken, refreshToken, profile, done) => {
    try {
        // Extraer los datos necesarios del perfil de GitHub
        const fullName = profile._json.name;
        const nameParts = fullName.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ');
        const email = profile._json.email;
        // Crear los datos del usuario a registrar
        const userData = {
            first_name: firstName,
            last_name: lastName,
            email,
            password: "1234", // Contraseña predeterminada para el registro
            isGithub: true,
        };
        // Registrar al usuario
        const userCreated = await usersServices.createUser(userData);
        return done(null, userCreated);
    } catch (error) {
        console.error('Error en el registro:', error);
        return (error);
    }
};
const loginGithub = async (accessToken, refreshToken, profile, done)=>{
    try {
        const email = profile._json.email;
        const userData = { email, password: "1234" }; // Datos para el inicio de sesión
    // Iniciar sesión del usuario
    const userLogin = await usersServices.login(userData);
    return done(null, userLogin);
    } catch (error) {
        console.error('Error en el login:', error);
        return (error);
    }
}

//passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin));

// Estrategia de Passport para registro
passport.use("github-register", new GithubStrategy(strategyRegister, registerGithub));

// Estrategia de Passport para inicio de sesión
passport.use("github-login", new GithubStrategy(strategyLogin, loginGithub));