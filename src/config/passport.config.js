import passport from 'passport';
import passportLocal from 'passport-local';
import jwtStrategy from 'passport-jwt';
import userModel from '../models/user.model.js';
import { PRIVATE_KEY, createHash, isValidPassword } from '../utils.js';
import router from '../routes/users.views.router.js';



// Declaramos la estrategia
const localStrategy = passportLocal.Strategy;

// JWT
const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

/**
 * Función para inicializar Passport y definir las estrategias de autenticación.
 */
const initializePassport = () => {
    /**
     *  Inicializando la estrategia local, username sera para nosotros email.
     *  Done será nuestro callback
    */

    // Register
    passport.use('register', new localStrategy(
        {
            passReqToCallback: true, // Permite acceder al objeto `req` dentro de la función de autenticación
            usernameField: 'email' // Definimos que el "username" será el campo "email"
        },
        /**
         * 📌 Callback de autenticación
         * Recibe el request, el username (email), la contraseña y la función `done`
         */
        async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body;
            console.log("Registrando usuario:");
            console.log(req.body);

            try {

                // Verifico si el user que me pasan ya existe
                const userExists = await userModel.findOne({ email })
                if (userExists) {
                    console.log("El usuario ya existe.");
                    return done(null, false); // Retorna `false` indicando que la autenticación falló
                }

                // DTO
                let newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password), // <--- esto se va a encryptar
                }

                const result = await userModel.create(newUser)

                // Todo salió bien, retornamos el usuario registrado
                return done(null, result);


            } catch (error) {
                return done("Error registrando el usuario: " + error);
            }
        }
    ))

    // Login
    // TODO::: OJO si usamos Passport-JWT lo reemplazamos por login(LocalStrategy)
    /* =====================================
    =               JwtStrategy            =
    ===================================== */
    passport.use('jwt', new JwtStrategy(
        {
            jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
            secretOrKey: PRIVATE_KEY
        },
        async (jwt_payload, done) => {
            console.log("Entrando a passport Strategy con JWT.");
            try {
                console.log("JWT obtenido del Payload");
                console.log(jwt_payload);

                return done(null, jwt_payload.user)



            } catch (error) {
                return done(error)
            }
        }

    ))

    /**
    * 📌 Serialización del Usuario
    * Se ejecuta después de una autenticación exitosa.
    * Passport almacena solo el `user._id` en la sesión en lugar de todo el objeto usuario.
    */

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id);
            done(null, user)
        } catch (error) {
            console.error("Error deserializando el usuario: " + error);
        }
    })
}



const cookieExtractor = req => {
    let token = null;

    console.log("Entrando a Cookie Extractor");

    if (req && req.cookies) {//Validamos que exista el request y las cookies.
        console.log("Cookies presentes: ");
        console.log(req.cookies);

        token = req.cookies['jwtCookieToken']
        console.log("Token obtenido desde Cookie:");
        console.log(token);
    }
    return token;
}

export default initializePassport;