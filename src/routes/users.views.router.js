import { Router } from 'express';
import { passportCall, authorization } from '../utils.js';
import CoursesServiceMongo from '../services/dao/mongo/courses.service.js';

const router = new Router();
const courseService = new CoursesServiceMongo();

/* ================================
=  VISTAS SOLO PARA USUARIOS      =
================================ */

// Login y registro
router.get('/login', (req, res) => {
    res.render("login");
});

router.get('/register', (req, res) => {
    res.render("register");
});

// Perfil del usuario (requiere login con JWT y rol 'user')
router.get('/profile',
    passportCall('jwt'),
    authorization('user'),
    (req, res) => {
        res.render("profile", {
            user: req.user
        });
    }
);

// Vista de cursos disponibles
router.get('/courses',
    passportCall('jwt'),
    authorization('user'),
    async (req, res) => {
        // Acá deberías obtener los cursos desde el servicio o modelo
        const courses = await courseService.getAll();
        res.render("courses", {
            user: req.user,
            courses
        });
    }
);

// Vista del carrito del usuario
router.get('/cart',
    passportCall('jwt'),
    authorization('user'),
    async (req, res) => {
        const cart = req.user.cart || []; // Suponiendo que el carrito está en el user (modificable)
        res.render("cart", { user: req.user, cart });
    }
);

// Finalizar compra y ver ticket
router.get('/ticket',
    passportCall('jwt'),
    authorization('user'),
    (req, res) => {
        const ticketId = req.query.ticketId; // Pasado en la redirección
        res.render("ticket", { ticketId });
    }
);

export default router;