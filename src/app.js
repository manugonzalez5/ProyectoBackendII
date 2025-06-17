import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import config from './config/config.js';
import MongoSingleton from './config/mongodb-singleton.js';
import methodOverride from 'method-override';

// 🔐 Passport
import passport from 'passport';
import initializePassport from './config/passport.config.js';

// ✅ Cookie parser
import cookieParser from 'cookie-parser'; 

//Routers a importar:
import studentRouter from './routes/students.router.js';
import coursesRouter from './routes/courses.router.js';
import emailRouter from './routes/email.router.js';
import smsRouter from './routes/sms.router.js';
import viewsRouter from './routes/views.routes.js';
import usersViewRouter from './routes/users.views.router.js';
import sessionsRouter from './routes/sessions.router.js';
import adminRouter from './routes/admin.views.router.js';
import cartRouter from './routes/cart.views.router.js';

const app = express();

// 🌐 Servir archivos estáticos (como adminLogin.js)
app.use(express.static(__dirname + '/public'));

// 📦 Configuración básica
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());

// 🔐 Inicializar Passport
initializePassport(); // Registra las estrategias como 'jwt'
app.use(passport.initialize());

// ⚙️ Configuración de Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// 📚 Rutas API
app.use("/api/students", studentRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/email", emailRouter);
app.use("/api/sms", smsRouter);
app.use("/api/cart", cartRouter);

// 🌍 Vistas y sesiones
app.use('/', viewsRouter);
app.use('/users', usersViewRouter);
app.use('/admin', adminRouter);
app.use('/api/sessions', sessionsRouter);

// 🚀 Iniciar servidor
app.listen(config.port, () => {
    console.log("Servidor escuchando por el puerto: " + config.port);
});

// 🔗 Conexión Mongo (si no usás Factory)
const mongoInstance = async () => {
    try {
        await MongoSingleton.getInstance();
    } catch (error) {
        console.error(error);
        process.exit();
    }
};
mongoInstance();