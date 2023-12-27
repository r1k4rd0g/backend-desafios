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
const strategyOptions = {
    clientID: "Iv1.4bd7f92440eecbc2",
    clientSecret: "630c1746089da2e6fcac8ea358b494738a422ad2",
    callbackURL: "http://localhost:8088/api/users/github", //tenemos que tener creado el endpoint de esta url
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    //console.log(profile); //nota: de acá veremos los datos que vienen y podremos usar
    const email = profile._json.email; //este dato se saca de la cuenta de github
    const user = await usersServices.getByEmail(email);
    if (user) return done(null, user);
    const newUser = await usersServices.createUser({
        first_name: profile._json.name,
        email,
        //Image: profile._json.avatar_url,
        isGithub: true,
        password: "1234"
    });
    return done(null, newUser);
};

passport.use("github", new GithubStrategy(strategyOptions, registerOrLogin));