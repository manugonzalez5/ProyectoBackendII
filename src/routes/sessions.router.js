import { Router } from 'express';
import { createHash, isValidPassword, generateJWToken } from '../utils.js';
import passport from 'passport';
import studentsModel from '../services/dao/mongo/models/students.js';
import CartsServiceMongo from '../services/dao/mongo/carts.service.js';

const router = Router();
const cartsService = new CartsServiceMongo();

// 📌 Register con manejo de errores adecuado para fetch()
router.post('/register', (req, res, next) => {
    passport.authenticate('register', { session: false }, async (err, user, info) => {
        if (err) return res.status(500).send({ status: 'error', message: err });

        if (!user) {
            return res.status(400).send({ status: 'error', message: 'El estudiante ya existe' });
        }

        return res.status(200).send({
            status: 'success',
            message: 'Estudiante registrado correctamente',
        });
    })(req, res, next);
});

// 📌 Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await studentsModel.findOne({ email });

        if (!user) {
            console.warn("Estudiante no encontrado con email: " + email);
            return res.status(404).json({ error: "Email o contraseña incorrecto", email });
        }

        if (!isValidPassword(user, password)) {
            return res.status(401).json({ error: "Email o contraseña incorrecto", email });
        }

        const tokenUser = {
            name: `${user.name} ${user.lastName}`,
            email: user.email,
            age: user.age,
            role: user.role
        };

        const access_token = generateJWToken(tokenUser);

        res.cookie('jwtCookieToken', access_token, {
            maxAge: 6000000,
            httpOnly: true
        });

        return res.json({ success: true, redirect: '/profile' });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('jwtCookieToken'); // Elimina la cookie con el JWT
    res.redirect('/'); // Redirige al index o login
});

// Fallbacks
router.get("/fail-register", (req, res) => {
    res.status(401).send({ error: "Fallo en el registro" });
});

router.get("/fail-login", (req, res) => {
    res.status(401).send({ error: "Fallo en el login" });
});

export default router;
